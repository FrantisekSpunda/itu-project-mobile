import { AUTH_TOKEN_STORAGE_KEY } from '@/config'
import * as SecureStore from 'expo-secure-store'

export const saveAuthToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(AUTH_TOKEN_STORAGE_KEY, token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    })
  } catch (error) {
    console.error('Chyba při ukládání tokenu:', error)
  }
}

export const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync(AUTH_TOKEN_STORAGE_KEY)
    return token || null
  } catch (error) {
    console.error('Chyba při načítání tokenu:', error)
    return null
  }
}

export const removeAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_STORAGE_KEY)
    return true
  } catch (error) {
    console.error('Chyba při odstraňování tokenu:', error)
    return false
  }
}
