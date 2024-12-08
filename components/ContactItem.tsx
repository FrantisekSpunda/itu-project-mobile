import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, ViewProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconCreditCard } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'

type ContactItemProps = ViewProps & {
  user: {
    firstName: string
    lastName: string
  }
  amount: number
}

export const ContactItem = ({ user, amount, ...rest }: ContactItemProps) => {
  const { push } = useRouter()

  return (
    <View {...rest} style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}>
      <TouchableOpacity style={tw('flexRow', 'itemsCenter')} onPress={() => push('/contact_detail')}>
        <View style={tw({ width: 30, height: 30 }, 'roundedFull', 'p1', 'bgLightGray', 'mR3')}>
          <ThemedText style={tw('textCenter')}>
            {user.firstName[0]}
            {user.lastName[0]}
          </ThemedText>
        </View>
        <ThemedText style={tw()}>
          {user.firstName} {user.lastName}
        </ThemedText>
      </TouchableOpacity>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ '+': 'textGreen', '-': 'textRed', '': 'textGray' }[getSign(amount)] as any, 'mR3')}>
          {amount > 0 && '+'}
          {amount} Kč
        </ThemedText>
        {getSign(amount) == '-' && (
          <TouchableOpacity
            style={tw({ width: 30, height: 30 }, 'flex', 'itemsCenter', 'justifyCenter', 'roundedFull', 'bgLightGray')}
            onPress={() => push('/settlement_add')}
          >
            <IconCreditCard size={18} style={tw('textBlack')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
