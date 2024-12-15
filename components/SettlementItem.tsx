import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconArrowNarrowRight, IconCash, IconCreditCard, IconShoppingCart } from '@tabler/icons-react-native'
import { Badge } from './Badge'
import { useRouter } from 'expo-router'
import { Expense } from '@/api'
import { formatPrice } from '@/utils'

type SettlementItemProps = TouchableOpacityProps & {
  expense: Expense
}

export const SettlementItem = ({ expense, ...rest }: SettlementItemProps) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity
      {...rest}
      style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}
      onPress={(e) => {
        push(`/settlement/${expense.id}`)
      }}
    >
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'flex', 'justifyCenter', 'itemsCenter', 'mR3')}>
          <IconCash size={18} style={tw('textGreen')} />
          <View style={tw({ opacity: 0.1 }, 'absolute', 'top0', 'roundedFull', 'left0', 'wFull', 'hFull', 'bgGreen')} />
        </View>
        <View style={tw({ gap: 4 }, 'flexCol')}>
          <ThemedText>Vyrovnání</ThemedText>
          <View style={tw('flexRow', 'itemsCenter', { gap: 4 })}>
            <Badge label={expense.settlement.payer.name} />
            <IconArrowNarrowRight size={14} style={tw('textGray')} />
            <Badge label={expense.settlement.deptor.name} />
          </View>
        </View>
      </View>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ '+': 'textGreen', '-': 'textRed', '': 'textGray' }[getSign(expense.price_calculated)] as any, 'mR3')}>
          {expense.price_calculated > 0 && '+'}
          {formatPrice(expense.price_calculated)}
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}
