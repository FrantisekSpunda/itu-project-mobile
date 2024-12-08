import { useStore } from '@/hooks'
import { tw } from '@/utils'
import { usePathname, useRouter } from 'expo-router'
import { useFormikContext } from 'formik'
import { useEffect } from 'react'
import { View } from 'react-native'

export const BottomActionBar = ({ children }: { children: React.ReactNode }) => {
  const { setStore } = useStore()

  const formik = useFormikContext()

  useEffect(() => {
    setStore('form.bottomActionBar', formik.dirty ? children : null)
  }, [formik.dirty])

  return null
}

BottomActionBar.Provider = () => {
  const { store, setStore } = useStore()
  const pathname = usePathname()

  useEffect(() => {
    setStore('form.bottomActionBar', null)
  }, [pathname])

  if (!store.form.bottomActionBar) return null

  return <View style={tw('flexRow', 'bgWhite', 'wFull', 'pY2', 'pX8', 'justifyEnd', 'z100', { gap: 16 })}>{store.form.bottomActionBar}</View>
}
