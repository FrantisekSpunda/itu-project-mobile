import { tw } from '@/utils'
import { IconPlus } from '@tabler/icons-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'

/**
 * Floating button to add new expense
 */
export const BottomAddButton = () => {
  const { push } = useRouter()
  const navigation = useNavigation()
  const currentRoute = navigation.getState().routes[navigation.getState().index].name

  if (currentRoute == 'index' || currentRoute == 'expenses')
    return (
      <TouchableOpacity
        style={tw('absolute', 'bgPrimary', 'roundedFull', { bottom: 20, left: '50%', transform: [{ translateX: -28 }] })}
        onPress={() => push('/expense/create')}
      >
        <IconPlus size={56} style={tw('textWhite')} />
      </TouchableOpacity>
    )
}
