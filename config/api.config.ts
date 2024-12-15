import { makeRedirectUri } from 'expo-auth-session'

/**
 *  API base url
 */
export const API_BASE_URL = 'https://api.itu.matejkrenek.cz'

/**
 * Google client id
 */
export const GOOGLE_CLIENT_ID = '1065320445563-ri6n5ui5i4qv7krkfu1ud6h6cpb3rept.apps.googleusercontent.com'

/**
 * Google redirect uri
 */
export const REDIRECT_URI = makeRedirectUri({ scheme: 'yourapp' })

/**
 * Google auth endpoint
 */
export const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/auth'

/**
 * Auth token storage key
 */
export const AUTH_TOKEN_STORAGE_KEY = 'authToken'
