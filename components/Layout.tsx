import { ScrollView, View, ViewProps } from 'react-native'
import { tw } from '@/utils/utils.tailwind'
import { TopBar } from './Topbar'
import { BottomAddButton } from './BottomAddButton'
import { BottomActionBar } from './BottomActionBar'
import { ThemedText } from './ThemedText'
import { useAuthGoogle, useStore } from '@/hooks'
import React from 'react'
import { FlashMessage } from './FlashMessage'

type LayoutProps = ViewProps & {
  scrollEnabled?: boolean
}

/**
 * Layout component for the app.
 * @param scrollEnabled - Whether the scroll view should be enabled.
 * @param children - The children to be rendered inside the layout.
 * @param rest - The rest of the props to be passed to the View component.
 * @returns The Layout component.
 */
export const Layout = ({ scrollEnabled = true, children, ...rest }: LayoutProps) => {
  const { store } = useStore()
  useAuthGoogle()

  return (
    <View {...rest} style={tw('wFull', 'hFull', 'bgBackground', 'relative')}>
      <TopBar />
      <ScrollView contentContainerStyle={tw({ rowGap: 16 }, 'flexCol', 'p4', 'pB20', 'wFull', 'minHFull')}>{children}</ScrollView>
      <BottomAddButton />
      <FlashMessage />
      <View style={tw('absolute', { bottom: 0, left: 0 })}>
        {/* <UnsavedChanges.Provider /> */}
        <BottomActionBar.Provider />
      </View>
    </View>
  )
}

/**
 * Layout component for the login screen.
 * @param children - The children to be rendered inside the layout.
 * @param rest - The rest of the props to be passed to the View component.
 * @returns The Layout component.
 */
Layout.login = ({ children, ...rest }: LayoutProps) => {
  const {
    store: {
      auth: { token },
    },
  } = useStore()

  useAuthGoogle()

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
