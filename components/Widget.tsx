import { Box, BoxProps } from '@/components/Box'
import { ThemedText } from '@/components/ThemedText'
import { getSign } from '@/utils/utils.number'
import { tw } from '@/utils/utils.tailwind'
import { IconArrowNarrowRight, IconCash, IconCoins, IconCreditCard } from '@tabler/icons-react-native'
import { View } from 'react-native'
import { Badge } from './Badge'
import { Button } from './Button'
import { Contact, Expense, OverviewBalance, Settlement, useGetOverviewBalance } from '@/api'
import { formatPrice } from '@/utils'

type WidgetDeptProps = BoxProps & {
  buttons?: React.ReactNode
}

export const Widget = () => {
  return <ThemedText>Zvolte widget</ThemedText>
}

Widget.dept = ({ buttons, style, ...rest }: WidgetDeptProps) => {
  const [balance] = useGetOverviewBalance()

  return (
    <Box {...rest} style={[...tw('relative', 'p0'), ...(style instanceof Array ? style : [])]}>
      <View style={tw('p3')}>
        <IconCoins style={tw({ top: 12, position: 'absolute', right: 12 }, 'textGray')} />
        <ThemedText>Celkový dluh</ThemedText>
        <View style={tw('flexRow', 'itemsBaseline', 'mT3')}>
          <ThemedText type="heading1" style={tw('textGreen', 'mR3')}>
            {(balance?.balance || 0) > 0 && '+'}
            {formatPrice(balance?.balance || 0)}
          </ThemedText>
          <ThemedText type="caption" style={tw('textGray', 'mR3')}>
            Dluží vám: +{formatPrice(balance?.total_owed || 0)}
          </ThemedText>
          <ThemedText type="caption" style={tw('textGray')}>
            Dlužíte: -{formatPrice(balance?.total_paid || 0)}
          </ThemedText>
        </View>
      </View>
      {buttons && <View style={tw('borderT', 'borderLightGray', 'p3', 'flexRow', 'justifyEnd', { gap: 8 })}>{buttons}</View>}
    </Box>
  )
}

type WidgetContactProps = BoxProps & {
  contact: Contact
}

Widget.contact = ({ contact, style, ...rest }: WidgetContactProps) => {
  return (
    <Box {...rest} style={[...tw('relative', 'p0', 'borderBlue'), ...(style instanceof Array ? style : [])]}>
      <View style={tw('p3')}>
        <IconCoins style={tw({ top: 12, position: 'absolute', right: 12 }, 'textGray')} />
        <ThemedText>Dluhy s uživatelem {contact.name}</ThemedText>
        <View style={tw('flexRow', 'itemsBaseline', 'mT3')}>
          <ThemedText type="heading1" style={tw({ owed: 'textGreen', owe: 'textRed', settled: 'textGray' }[contact.balance_detail.type] as any, 'mR3')}>
            {contact.balance_detail.type === 'owed' && '+'}
            {formatPrice(contact.balance_detail.balance * -1)}
          </ThemedText>
          <ThemedText type="caption" style={tw('textGray', 'mR3')}>
            Dluží vám: {formatPrice(Number(contact.balance_detail.total_paid))}
          </ThemedText>
          <ThemedText type="caption" style={tw('textGray')}>
            Dlužíte: {formatPrice(Math.abs(Number(contact.balance_detail.total_dept)))}
          </ThemedText>
        </View>
      </View>
    </Box>
  )
}

type WidgetSettlementProps = BoxProps & {
  expense: Expense
  style?: any[]
}

Widget.settlement = ({ expense, style, ...rest }: WidgetSettlementProps) => {
  return (
    <Box {...rest} style={[...tw('relative', 'borderGreen'), ...(style instanceof Array ? style : [])]}>
      <IconCash style={tw({ top: 12, position: 'absolute', right: 12 }, 'textGray')} />
      <ThemedText>Vyrovnání 2. 11. 2024</ThemedText>
      <View style={tw('flexRow', 'itemsCenter', 'mT3')}>
        <ThemedText type="heading1" style={tw('mR3')}>
          +{formatPrice(expense.price)}
        </ThemedText>
        <View style={tw('flexRow', 'itemsCenter', 'mL2', { gap: 4 })}>
          <Badge label={expense.payer.name} />
          <IconArrowNarrowRight size={14} style={tw('textGray')} />
          <Badge label={expense.deptors[0].deptor.name} />
        </View>
      </View>
    </Box>
  )
}
