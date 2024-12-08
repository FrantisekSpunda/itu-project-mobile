import { useFormikContext } from 'formik'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { ThemedText } from './ThemedText'
import { tw } from '@/utils/utils.tailwind'
import { useStore } from '@/hooks'
import { useEffect } from 'react'
import { IconAlertCircle } from '@tabler/icons-react-native'

export const UnsavedChanges = () => {
  const formik = useFormikContext()
  const { setStore } = useStore()

  useEffect(() => {
    setStore('form.unsavedChanges', formik.dirty)
  }, [formik.dirty])

  return null
}

UnsavedChanges.Provider = () => {
  const { store } = useStore()

  if (!store.form.unsavedChanges) return null

  return (
    <View style={tw('flexRow', 'pY2', 'pX4', 'mL1', 'mB1', 'bgWhite', 'roundedFull', 'border', 'borderLightGray', 'selfStart', { gap: 16 })}>
      <IconAlertCircle size={18} style={tw('textBlack')} />
      <ThemedText type="body1">Máte neuložené změny</ThemedText>
    </View>
  )
}
