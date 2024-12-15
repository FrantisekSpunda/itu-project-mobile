import { Layout, Heading, Button, Box, Input, BottomActionBar, Select, SelectRef, Badge } from '@/components'
import { tw } from '@/utils/utils.tailwind'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { IconArrowNarrowRight, IconCash, IconX } from '@tabler/icons-react-native'
import { View, Image } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { usePostSettlementsMarkAsPaid, usePostSettlementsPreview } from '@/api'
import { formatPrice } from '@/utils'

export default function SettlementAdd() {
  const { back } = useRouter()
  const { contact_id } = useLocalSearchParams<{ contact_id: string }>()

  const [settlementPreview] = usePostSettlementsPreview(Number(contact_id))

  const handleSubmit = usePostSettlementsMarkAsPaid()

  if (!settlementPreview) return null

  return (
    <Layout scrollEnabled={false}>
      <Heading text="Vyrovnat se" showSearch={false} />
      <Box label="Detail dluhu" style={tw('borderTransparent', { gap: 16 })}>
        <ThemedText type="heading2">{formatPrice(settlementPreview.price)}</ThemedText>
        <View style={tw('flexRow', 'itemsCenter', { gap: 4 })}>
          <Badge label={settlementPreview.payer.name} />
          <IconArrowNarrowRight size={14} style={tw('textGray')} />
          <Badge label={settlementPreview.deptor.name} />
        </View>
        <ThemedText type="body2" style={tw('textGray', 'textCenter')}>
          Naskenute QR platby kód níže nebo označte jako zaplacené, pokud byl použit jiný způsob platby.
        </ThemedText>
        <View style={tw('flex', 'itemsCenter')}>
          <View style={tw('p4', 'border', 'borderGray', 'roundedLg', { borderStyle: 'dashed', borderRadius: 20 })}>
            <Image source={{ uri: settlementPreview.qrcode }} width={150} height={150} />
          </View>
        </View>
        <View style={tw('flexRow', 'justifyEnd', { gap: 8 })}>
          <Button type="white" label="Zrušit" icon={<IconX />} onPress={() => back()} />
          <Button type="primary" label="Označit jako zaplacené" icon={<IconCash />} onPress={() => handleSubmit(Number(contact_id))} />
        </View>
      </Box>
    </Layout>
  )
}

export const getStaticProps = () => {
  return {
    options: {
      headerShown: false, // Skrytí headeru
    },
  }
}
