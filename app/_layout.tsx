import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Redirect, Stack, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { useColorScheme } from '@/hooks/useColorScheme'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Store, useAuth, useAuthGoogle, useStore } from '@/hooks'
import { Linking } from 'react-native'
import { ThemedText } from '@/components'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return <ThemedText>Loading...</ThemedText>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Store>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="expense_add" options={{ headerShown: false }} />
            <Stack.Screen name="expense_detail" options={{ headerShown: false }} />

            <Stack.Screen name="contact_add" options={{ headerShown: false }} />
            <Stack.Screen name="contact_detail" options={{ headerShown: false }} />

            <Stack.Screen name="settlement_add" options={{ headerShown: false }} />
            <Stack.Screen name="settlement_detail" options={{ headerShown: false }} />

            <Stack.Screen name="user_profile" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </Store>
    </GestureHandlerRootView>
  )
}
