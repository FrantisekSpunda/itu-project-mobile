import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { tailwind } from 'react-native-tailwindcss'
import { IconLogin, IconLogout, IconRegistered, IconUser } from '@tabler/icons-react-native' // adjust import based on your setup
import { tw } from '@/utils/utils.tailwind'
import { useRouter } from 'expo-router'
import { ThemedText } from './ThemedText'
import { useAuth } from '@/hooks'

/**
 * Topbar for logged in users
 */
export const TopBar = () => {
  const { push } = useRouter()
  const { logout } = useAuth()

  return (
    <View style={tw('bgWhite')}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={tw('flexRow', 'justifyBetween', 'itemsCenter', 'pY2', 'pX3', 'mT0')}>
        <TouchableOpacity style={tw('flexRow', { gap: 4 })} onPress={() => push('/(tabs)')}>
          <ThemedText type="heading2" style={tw('textSecondary')}>
            Shared
          </ThemedText>
          <ThemedText type="heading2" style={tw('textPrimary')}>
            Fin.
          </ThemedText>
        </TouchableOpacity>

        <View style={tw('flexRow', { gap: 12 })}>
          <TouchableOpacity style={tw('roundedFull', 'bgGray100', 'p3')} onPress={() => logout()}>
            <IconLogout size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={tw('roundedFull', 'bgGray100', 'p3')} onPress={() => push('/user_profile')}>
            <IconUser size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

/**
 * Topbar for logged out users
 */
TopBar.login = () => {
  return (
    <View style={tw('bgWhite')}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={tw('flexRow', 'justifyCenter', 'itemsCenter', 'p2', 'mT0', { gap: 4 })}>
        <Text style={tw('textTitle', 'textSecondary', 'fontBold')}>Shared</Text>
        <Text style={tw('textTitle', 'textPrimary', 'fontBold')}>Fin.</Text>
      </View>
    </View>
  )
}
