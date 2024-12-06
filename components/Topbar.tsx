import React from 'react'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { tailwind } from 'react-native-tailwindcss'
import { IconUser } from '@tabler/icons-react-native' // adjust import based on your setup
import { tw } from '@/utils/utils.tailwind'
import { useRouter } from 'expo-router'

export const TopBar = () => {
  const { push } = useRouter()

  return (
    <View style={tw('bgWhite')}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View style={tw('flexRow', 'justifyBetween', 'itemsCenter', 'p2', 'mT0')}>
        <Text style={[tailwind.textLg, tailwind.fontBold]}>My xd</Text>
        <TouchableOpacity style={tw('roundedFull', 'bgGray100', 'p3')} onPress={() => push('/user_profile')}>
          <IconUser size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

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
