import { API_BASE_URL, AUTH_TOKEN_STORAGE_KEY } from '@/config'
import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import axios from 'axios'
import { useStore } from './useStore'
import { getAuthToken, removeAuthToken, saveAuthToken } from '@/utils'
import { CallbackRes } from '@/types'
import { useRouter, useSegments } from 'expo-router'

/**
 * Utility functions fro authentication
 * @returns
 */
export const useAuth = () => {
  const { setStore } = useStore()
  const { push } = useRouter()

  const logout = async () => {
    setStore('auth.token', null)
    await removeAuthToken()
    push('/login')
    return
  }

  return { logout }
}

/**
 * Authentication via Google
 * @returns
 */
export const useAuthGoogle = () => {
  const segments = useSegments()
  const publicPages = ['login', 'register']
  const router = useRouter()

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
      if (store.auth.token) {
        setLoaded(true)
        console.log('token v context storu', store.auth.token)
        return
      }
      console.log('no token in store')

      const loadedToken = await getAuthToken()
      if (loadedToken) {
        setStore('auth.token', loadedToken)
        setLoaded(true)
        console.log('token ve secure storage', loadedToken)
        return
      }
      console.log('no token in secure storage')

      handleDeepLink()
    }

    loadToken()
  }, [])

  useEffect(() => {
    if (router && loaded) {
      if (store.auth.token && publicPages.includes(segments[0])) router.replace('/')
      if (!store.auth.token && !publicPages.includes(segments[0])) router.replace('/login')
    }
  }, [store.auth.token, publicPages, segments, router])

  return loaded
}
