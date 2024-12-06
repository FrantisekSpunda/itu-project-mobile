import { tw } from '@/utils/utils.tailwind'
import { View, ViewProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconCreditCard } from '@tabler/icons-react-native'

type ContactItemProps = ViewProps & {
  user: {
    firstName: string
    lastName: string
  }
  amount: number
}

export const ContactItem = ({ user, amount, ...rest }: ContactItemProps) => {
  const isPozitive = amount < 0

  return (
    <View {...rest} style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}>
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'roundedFull', 'p1', 'bgLightGray', 'mR3')}>
          <ThemedText style={tw('textCenter')}>
            {user.firstName[0]}
            {user.lastName[0]}
          </ThemedText>
        </View>
        <ThemedText style={tw()}>
          {user.firstName} {user.lastName}
        </ThemedText>
      </View>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ '+': 'textGreen', '-': 'textRed', '': 'textGray' }[getSign(amount)] as any, 'mR3')}>
          {amount > 0 && '+'}
          {amount} Kč
        </ThemedText>
        {getSign(amount) == '-' && (
          <View style={tw({ width: 30, height: 30 }, 'flex', 'itemsCenter', 'justifyCenter', 'roundedFull', 'bgLightGray')}>
            <IconCreditCard size={18} style={tw('textBlack')} />
          </View>
        )}
      </View>
    </View>
  )
}
