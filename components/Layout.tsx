import { ScrollView, TouchableOpacity, View, ViewProps } from 'react-native'
import { tw } from '@/utils/utils.tailwind'
import { TopBar } from './Topbar'
import { IconPlus } from '@tabler/icons-react-native'
import { BottomAddButton } from './BottomAddButton'
import { UnsavedChanges } from './UnsavedChanges'
import { BottomActionBar } from './BottomActionBar'
import { ThemedText } from './ThemedText'
import { SearchModal } from './SearchModal'
import { useAuth, useAuthGoogle, useStore } from '@/hooks'
import { useEffect } from 'react'
import { Redirect, useRouter, useSegments } from 'expo-router'

type LayoutProps = ViewProps & {
  scrollEnabled?: boolean
}

export const Layout = ({ scrollEnabled = true, children, ...rest }: LayoutProps) => {
  const { store } = useStore()
  const { redirect } = useAuth()
  const authLoaded = useAuthGoogle()
  redirect(authLoaded)

  return (
    <View {...rest} style={tw('wFull', 'hFull', 'bgBackground', 'relative')}>
      <TopBar />
      <ScrollView
        contentContainerStyle={tw({ rowGap: 16 }, 'flexCol', 'p4', 'pB20', 'wFull', 'minHFull')}
        scrollEnabled={scrollEnabled && Object.values(store.modal).every((v) => !v)}
      >
        {children}
      </ScrollView>
      <BottomAddButton />
      <SearchModal />
      <View style={tw('absolute', { bottom: 0, left: 0 })}>
        {/* <UnsavedChanges.Provider /> */}
        <BottomActionBar.Provider />
      </View>
    </View>
  )
}

Layout.login = ({ children, ...rest }: LayoutProps) => {
  const {
    store: {
      auth: { token },
    },
  } = useStore()

  const [currentPage] = useSegments()
  const publicPages = ['login', 'register']

  console.log('wtfff', token)
  if (token && publicPages.includes(currentPage)) return <Redirect href="/" />
  if (!token && !publicPages.includes(currentPage)) return <Redirect href="/login" />

  return (
    <View {...rest} style={tw('wFull', 'hFull', 'bgBackground')}>
      <TopBar.login />
      <View>
        <View style={tw('wFull', 'bgBlue', 'absolute', 'left0', 'top0', { height: 320 })} />
        <ScrollView contentContainerStyle={tw('flexCol', 'p4', 'wFull', 'minHFull', { gap: 8 })}>
          <ThemedText type="title" style={tw('textWhite', 'textCenter', 'mT10', 'mB20')}>
            Dluhy mezi přáteli přehledně 🏃‍💸
          </ThemedText>
          {children}
        </ScrollView>
      </View>
    </View>
  )
}
