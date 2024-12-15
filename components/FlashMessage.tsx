import { tw } from '@/utils'
import { ThemedText } from './ThemedText'
import { useStore } from '@/hooks'
import { View } from 'react-native'
import { useEffect } from 'react'

type FlashMessageProps = {}

/**
 * Component for displaying flash messages
 */
export const FlashMessage = ({}: FlashMessageProps) => {
  const {
    store: {
      flashMessage: { content, style, show },
    },
    setStore,
  } = useStore()

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStore('flashMessage', (prev) => ({ ...prev, show: false }))
    }, 5000)

    return () => clearTimeout(timeout)
  }, [show])

  return (
    <View style={tw('absolute', 'wFull', 'pX6', 'pT6', { top: 0, left: 0, zIndex: 2000 }, show ? 'flex' : 'hidden')}>
      <View style={[...tw('bgLightGray', 'roundedLg', 'flexRow'), ...(style || [])]}>{!!content && content}</View>
    </View>
  )
}
