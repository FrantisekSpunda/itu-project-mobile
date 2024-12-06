import { tw } from '@/utils/utils.tailwind'
import { View, ViewProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconCreditCard, IconShoppingCart } from '@tabler/icons-react-native'

type ExpenseItemProps = ViewProps & {
  type?: string
  payer: {
    firstName: string
    lastName: string
  }
  label: string
  amount: number
}

export const ExpenseItem = ({ payer, label, amount, ...rest }: ExpenseItemProps) => {
  const isPozitive = amount < 0

  return (
    <View {...rest} style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}>
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'flex', 'justifyCenter', 'itemsCenter', 'mR3')}>
          <IconShoppingCart size={18} style={tw('textPrimary')} />
          <View style={tw({ opacity: 0.1 }, 'absolute', 'top0', 'roundedFull', 'left0', 'wFull', 'hFull', 'bgPrimary')} />
        </View>
        <View style={tw({ gap: 4 }, 'flexRow', 'itemsBaseline')}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="caption" style={tw()}>
            {payer.firstName} {payer.lastName}
          </ThemedText>
        </View>
      </View>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ '+': 'textGreen', '-': 'textRed', '': 'textGray' }[getSign(amount)] as any, 'mR3')}>
          {amount > 0 && '+'}
          {amount} Kč
        </ThemedText>
      </View>
    </View>
  )
}
