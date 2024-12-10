import { API_BASE_URL, AUTH_TOKEN_STORAGE_KEY } from '@/config'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import axios from 'axios'
import { useStore } from './useStore'
import { getAuthToken, removeAuthToken, saveAuthToken } from '@/utils'
import { CallbackRes } from '@/types'
import { Redirect, useRouter, useSegments } from 'expo-router'
import { ThemedText } from '@/components'

export const useAuth = () => {
  const { setStore } = useStore()
  const { push } = useRouter()
  const { store } = useStore()
  const [currentPage] = useSegments()
  const publicPages = ['login', 'register']

  const logout = async () => {
    setStore('auth.token', null)
    await removeAuthToken()
    push('/login')
    return
  }

  const redirect = (loaded: boolean) => {
    if (!loaded) return <ThemedText>Loading</ThemedText>

    if (store.auth.token && publicPages.includes(currentPage)) return <Redirect href="/" />
    if (!store.auth.token && !publicPages.includes(currentPage)) return <Redirect href="/login" />
  }

  return { logout, redirect }
}

export const useAuthGoogle = () => {
  const segments = useSegments()

  const [loaded, setLoaded] = useState(false)
  const { store, setStore } = useStore()

  // Cache data from google authentication
  useEffect(() => {
    const fetchGoogleUser = async (params: any) => {
      try {
        const {
          data: { user, token },
        } = await axios.get<CallbackRes>(`${API_BASE_URL}/auth/google/callback`, { params })

        saveAuthToken(token)
        setStore('auth', {
          token,
          user: {
            avatar: user.avatar,
            email: user.email,
            bankAccount: user.bank_account,
            bankIban: user.bank_iban,
            currencyId: user.currency_id,
            emailNotificationsOn: user.email_notifications_on,
            firstName: user.first_name,
            lastName: user.last_name,
            googleId: user.google_id,
            id: user.id,
            updatedAt: user.updated_at,
            createdAt: user.created_at,
          },
        })
        console.log('token načten z google authentikace')
      } catch (error: any) {
        // console.error('ERROR: Failed google authentication', error.response)
      }
    }

    const googleAuthParamsListener = async (event: { url: string }) => {
      const url = new URL(event.url)

      // Get params from google authentication
      let searchParams = {} as Record<string, string>

      url.searchParams.forEach((value: string, key: string) => {
        searchParams[key] = value
      })

      if (Object.keys(searchParams).length) await fetchGoogleUser(searchParams)
      setLoaded(true)
    }

    const handleDeepLink = async () => {
      Linking.addEventListener('url', googleAuthParamsListener)
      setLoaded(true)

      return () => {
        Linking.removeAllListeners('url')
      }
    }

    // Main function getting token from any shit
    const loadToken = async () => {
      console.log('loadToken call')

      if (store.auth.token) {
        setLoaded(true)
        console.log('token v context storu', store.auth.token)
        return
      }

      const loadedToken = await getAuthToken()
      if (loadedToken) {
        setStore('auth.token', loadedToken)
        setLoaded(true)
        console.log('token ve secure storage', loadedToken)
        return
      }

      handleDeepLink()
    }

    loadToken()
  }, [])

  return loaded
}
