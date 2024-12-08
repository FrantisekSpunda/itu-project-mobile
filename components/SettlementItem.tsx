import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { IconArrowNarrowRight, IconCash, IconCreditCard, IconShoppingCart } from '@tabler/icons-react-native'
import { Badge } from './Badge'
import { useRouter } from 'expo-router'

type SettlementItemProps = TouchableOpacityProps & {
  payer: {
    firstName: string
    lastName: string
  }
  amount: number
}

export const SettlementItem = ({ payer, amount, onPress, ...rest }: SettlementItemProps) => {
  const { push } = useRouter()

  return (
    <TouchableOpacity
      {...rest}
      style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}
      onPress={(e) => {
        push('/settlement_detail')
        if (onPress) onPress(e)
      }}
    >
      <View style={tw('flexRow', 'itemsCenter')}>
        <View style={tw({ width: 30, height: 30 }, 'flex', 'justifyCenter', 'itemsCenter', 'mR3')}>
          <IconCash size={18} style={tw('textGreen')} />
          <View style={tw({ opacity: 0.1 }, 'absolute', 'top0', 'roundedFull', 'left0', 'wFull', 'hFull', 'bgGreen')} />
        </View>
        <View style={tw({ gap: 4 }, 'flexRow', 'itemsCenter')}>
          <ThemedText>Vyrovnání</ThemedText>
          <View style={tw('flexRow', 'itemsCenter', 'mL2', { gap: 4 })}>
            <Badge label="Já" />
            <IconArrowNarrowRight size={14} style={tw('textGray')} />
            <Badge label={`${payer.firstName} ${payer.lastName}`} />
          </View>
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
