import { useFormikContext } from 'formik'
import { View } from 'react-native'
import { ThemedText } from '.'
import { tw } from '@/utils/utils.tailwind'
import { useStore } from '@/hooks'
import { useEffect } from 'react'

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

  if (store.form.unsavedChanges)
    return (
      <View style={tw('flexRow', 'absolute', { bottom: 16, left: 16 })}>
        <ThemedText>Máte neuložené změny</ThemedText>
      </View>
    )

  return null
}
