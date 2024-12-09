import { makeRedirectUri } from 'expo-auth-session'

/**
 *
 */
export const API_BASE_URL = 'https://api.itu.matejkrenek.cz/'

/**
 *
 */
export const GOOGLE_CLIENT_ID = '1065320445563-ri6n5ui5i4qv7krkfu1ud6h6cpb3rept.apps.googleusercontent.com'

/**
 *
 */
export const REDIRECT_URI = makeRedirectUri({ scheme: 'yourapp' })
