import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, ViewProps, Image } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { IconCreditCard } from '@tabler/icons-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { Contact } from '@/api/types'
import { formatPrice, getAvatar } from '@/utils'
import { UserImage } from './UserImage'

type ContactItemProps = ViewProps & {
  contact: Contact
}

export const ContactItem = ({ contact, ...rest }: ContactItemProps) => {
  const { push } = useRouter()

  return (
    <View {...rest} style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}>
      <TouchableOpacity style={tw('flexRow', 'itemsCenter')} onPress={() => push(`/contact/${contact.id}`)}>
        <UserImage contact={contact} />
        <ThemedText style={tw()}>{contact.name}</ThemedText>
      </TouchableOpacity>
      <View style={tw('flexRow', 'itemsCenter', { gap: 12 })}>
        <View style={tw('flexCol')}>
          {contact.balance_detail.type !== 'settled' && <ThemedText type="caption">{contact.balance_detail.type === 'owe' ? 'Dlužíte' : 'Dluží'}</ThemedText>}
          <ThemedText style={tw({ owed: 'textGreen', owe: 'textRed', settled: 'textGray' }[contact.balance_detail.type] as any)}>
            {contact.balance_detail.type === 'owed' && '+'}
            {formatPrice(contact.balance_detail.balance, contact.balance_detail.type)}
          </ThemedText>
        </View>
        {contact.balance_detail.type !== 'settled' && (
          <TouchableOpacity
            style={tw({ width: 30, height: 30 }, 'flex', 'itemsCenter', 'justifyCenter', 'roundedFull', 'bgLightGray')}
            onPress={() => push(`/settlement/create/${contact.id}`)}
          >
            <IconCreditCard size={18} style={tw('textBlack')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
