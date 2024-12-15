import { useStore } from '@/hooks'
import { tw } from '@/utils'
import { usePathname } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

type BottomActionBarProps = {
  show: any
  children: React.ReactNode
}

/**
 * Floating button for form submitting and other buttons
 */
export const BottomActionBar = ({ show, children }: BottomActionBarProps) => {
  const { setStore } = useStore()
  const pathname = usePathname()

  useEffect(() => {
    setStore('form.bottomActionBar', show ? children : null)
  }, [show, pathname])

  return null
}

/**
 * Provider for bottom action bar
 */
BottomActionBar.Provider = () => {
  const { store } = useStore()

  if (!store.form.bottomActionBar) return null

  return <View style={tw('flexRow', 'bgWhite', 'wFull', 'pY3', 'pX8', 'justifyEnd', 'z100', { gap: 16 })}>{store.form.bottomActionBar}</View>
}

/**
 * Hook for hiding bottom action bar on page if its used
 */
export const useHideBottomActionBar = () => {
  const { setStore } = useStore()
  const pathname = usePathname()

  useEffect(() => {
    // const timeout = setTimeout(() => {
    // }, 500)
    setStore('form.bottomActionBar', null)

    // return clearTimeout(timeout)
  }, [pathname])
}
