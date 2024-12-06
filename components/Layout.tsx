import { ScrollView, TouchableOpacity, View, ViewProps } from 'react-native'
import { tw } from '@/utils/utils.tailwind'
import { TopBar } from './Topbar'
import { IconPlus } from '@tabler/icons-react-native'
import { useNavigation } from 'expo-router'
import { ThemedText } from './ThemedText'

type LayoutProps = ViewProps & {}

export const Layout = ({ children, ...rest }: LayoutProps) => {
  const navigation = useNavigation()
  const currentRoute = navigation.getState().routes[navigation.getState().index].name

  return (
    <View {...rest} style={tw('wFull', 'hFull', 'bgBackground')}>
      <TopBar />
      <ScrollView contentContainerStyle={tw({ rowGap: 16 }, 'flexCol', 'p4', 'wFull', 'minHFull')}>{children}</ScrollView>
      {(currentRoute == 'index' || currentRoute == 'expenses') && (
        <TouchableOpacity style={tw('absolute', 'bgPrimary', 'roundedFull', { bottom: 20, left: '50%', transform: [{ translateX: -28 }] })}>
          <IconPlus size={56} style={tw('textWhite')} />
        </TouchableOpacity>
      )}
    </View>
  )
}

Layout.login = ({ children, ...rest }: LayoutProps) => {
  const navigation = useNavigation()
  const currentRoute = navigation.getState().routes[navigation.getState().index].name

  return (
    <View {...rest} style={tw('wFull', 'hFull', 'bgBackground')}>
      <TopBar.login />
      <View>
        <View style={tw('wFull', 'bgBlue', 'absolute', 'left0', 'top0', { height: 320 })} />
        <ScrollView contentContainerStyle={tw({ rowGap: 16 }, 'flexCol', 'p4', 'wFull', 'minHFull')}>
          <ThemedText type="title" style={tw('textWhite', 'textCenter', 'mT10', 'mB24')}>
            Dluhy mezi přáteli přehledně 🏃‍💸
          </ThemedText>
          {children}
        </ScrollView>
      </View>
    </View>
  )
}
