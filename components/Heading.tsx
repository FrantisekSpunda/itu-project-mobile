import { View, ViewProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { tw } from '@/utils/utils.tailwind'
import { IconSearch, IconArrowLeft } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'

type HeadingProps = ViewProps & {
  text: string
  showSearch?: boolean
  showBack?: boolean
}

export const Heading = ({ text, showSearch = true, showBack = true }: HeadingProps) => {
  const { back } = useRouter()

  return (
    <View style={tw('flexRow', 'justifyBetween', 'wFull')}>
      <ThemedText type="heading1">{text}</ThemedText>
      <View style={tw('flexRow', 'itemsCenter')}>
        {showSearch && <IconSearch size={24} style={tw('textBlack')} />}
        {showBack && (
          <TouchableOpacity
            onPress={() => {
              back()
            }}
          >
            <IconArrowLeft size={24} style={tw('textBlack', 'mL3')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
