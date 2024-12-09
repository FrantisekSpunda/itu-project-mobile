import { useStore } from '@/hooks'
import { tw } from '@/utils'
import { usePathname } from 'expo-router'
import { useEffect } from 'react'
import { View } from 'react-native'

type BottomActionBarProps = {
  show: any
  children: React.ReactNode
}

export const BottomActionBar = ({ show, children }: BottomActionBarProps) => {
  const { setStore } = useStore()

  useEffect(() => {
    setStore('form.bottomActionBar', show ? children : null)
  }, [show])

  return null
}

BottomActionBar.Provider = () => {
  const { store, setStore } = useStore()
  const pathname = usePathname()

  useEffect(() => {
    setStore('form.bottomActionBar', null)
  }, [pathname])

  if (!store.form.bottomActionBar) return null

  return <View style={tw('flexRow', 'bgWhite', 'wFull', 'pY3', 'pX8', 'justifyEnd', 'z100', { gap: 16 })}>{store.form.bottomActionBar}</View>
}
