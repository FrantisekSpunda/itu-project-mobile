import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'
import 'react-native-reanimated'

import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Store } from '@/hooks'
import { ThemedText } from '@/components'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NetInfo from '@react-native-community/netinfo'
import { onlineManager } from '@tanstack/react-query'
import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'
import { focusManager } from '@tanstack/react-query'

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  })
  const queryClient = new QueryClient()

  // Refetch on reconect
  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  })

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)

    return () => subscription.remove()
  }, [])

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
      <QueryClientProvider client={queryClient}>
        <Store>
          <Stack screenOptions={{ animation: 'slide_from_right' }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="expense/create" options={{ headerShown: false }} />
            <Stack.Screen name="expense/[expense_id]" options={{ headerShown: false }} />

            <Stack.Screen name="contact/create" options={{ headerShown: false, presentation: 'modal', animation: 'fade' }} />
            <Stack.Screen name="contact/[contact_id]" options={{ headerShown: false }} />

            <Stack.Screen name="settlement/create/[contact_id]" options={{ headerShown: false }} />
            <Stack.Screen name="settlement/[expense_id]" options={{ headerShown: false }} />

            <Stack.Screen name="user_profile" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Store>
      </QueryClientProvider>
    </GestureHandlerRootView>
  )
}
