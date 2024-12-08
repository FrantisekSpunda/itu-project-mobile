import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, TouchableOpacityProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconCreditCard, IconFilePencil, IconShoppingCart } from '@tabler/icons-react-native'
import { useRouter } from 'expo-router'

type ExpenseItemProps = TouchableOpacityProps & {
  type?: string
  payer: {
    firstName: string
    lastName: string
  }
  label: string
  amount: number
  draft?: boolean
}

export const ExpenseItem = ({ payer, label, amount, draft, onPress, ...rest }: ExpenseItemProps) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity
      {...rest}
      style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}
      onPress={(e) => {
        draft ? push('/expense_add') : push('/expense_detail')
        if (onPress) onPress(e)
      }}
    >
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'flex', 'justifyCenter', 'itemsCenter', 'mR3')}>
          {!draft ? <IconShoppingCart size={18} style={tw('textPrimary')} /> : <IconFilePencil size={18} style={tw('textGray')} />}
          <View style={tw({ opacity: 0.1 }, 'absolute', 'top0', 'roundedFull', 'left0', 'wFull', 'hFull', 'bgPrimary')} />
        </View>
        <View style={tw({ gap: 4 }, 'flexRow', 'itemsBaseline')}>
          <ThemedText>{label}</ThemedText>
          <ThemedText type="caption">{!draft ? `${payer.firstName} ${payer.lastName}` : 'Nedokončené'}</ThemedText>
        </View>
      </View>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ '+': 'textGreen', '-': 'textRed', '': 'textGray' }[getSign(amount)] as any, 'mR3')}>
          {amount > 0 && '+'}
          {amount} Kč
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}
