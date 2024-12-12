import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconCreditCard, IconFilePencil, IconShoppingCart } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'
import { Balance, Contact, Expense } from '@/api/types'
import { formatPrice } from '@/utils'

type ExpenseItemProps = TouchableOpacityProps & {
  expense: Expense
}

export const ExpenseItem = ({ expense, ...rest }: ExpenseItemProps) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity
      {...rest}
      style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}
      onPress={(e) => {
        expense.is_draft ? push('/expense/create') : push('/expense/[expense_id]')
      }}
    >
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'flex', 'justifyCenter', 'itemsCenter', 'mR3')}>
          {!expense.is_draft ? <IconShoppingCart size={18} style={tw('textPrimary')} /> : <IconFilePencil size={18} style={tw('textGray')} />}
          <View style={tw({ opacity: 0.1 }, 'absolute', 'top0', 'roundedFull', 'left0', 'wFull', 'hFull', 'bgPrimary')} />
        </View>
        <View style={tw({ gap: 4 }, 'flexRow', 'itemsBaseline')}>
          <ThemedText>{expense.title}</ThemedText>
          <ThemedText type="caption">{!expense.is_draft ? expense.payer.name : 'Nedokončené'}</ThemedText>
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
