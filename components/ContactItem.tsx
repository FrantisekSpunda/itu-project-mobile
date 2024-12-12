import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, ViewProps, Image } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { IconCreditCard } from '@tabler/icons-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { Contact } from '@/api/types'
import { formatPrice, getAvatar } from '@/utils'

type ContactItemProps = ViewProps & {
  contact: Contact
}

export const ContactItem = ({ contact, ...rest }: ContactItemProps) => {
  const { push } = useRouter()

  return (
    <View {...rest} style={tw('wFull', 'flexRow', 'justifyBetween', 'itemsCenter', 'borderB', 'borderLightGray', 'p3')}>
      <TouchableOpacity style={tw('flexRow', 'itemsCenter')} onPress={() => push(`/contact/${contact.id}`)}>
        <View style={tw({ width: 30, height: 30 }, 'roundedFull', 'p1', 'bgLightGray', 'mR3', 'flex', 'itemsCenter', 'justifyCenter', 'overflowHidden')}>
          {contact.user?.avatar ? (
            <Image source={{ uri: contact.user.avatar }} style={{ width: 30, height: 30 }} />
          ) : (
            <ThemedText style={tw('textCenter')}>{getAvatar(contact.name)}</ThemedText>
          )}
        </View>
        <ThemedText style={tw()}>{contact.name}</ThemedText>
      </TouchableOpacity>
      <View style={tw('flexRow', 'itemsCenter')}>
        <ThemedText style={tw({ owed: 'textGreen', owe: 'textRed', settled: 'textGray' }[contact.balance_detail.type] as any, 'mR3')}>
          {contact.balance_detail.type === 'owed' && '+'}
          {formatPrice(contact.balance_detail.balance, contact.balance_detail.type)}
        </ThemedText>
        {contact.balance_detail.type !== 'settled' && (
          <TouchableOpacity
            style={tw({ width: 30, height: 30 }, 'flex', 'itemsCenter', 'justifyCenter', 'roundedFull', 'bgLightGray')}
            onPress={() => push('/settlement/create')}
          >
            <IconCreditCard size={18} style={tw('textBlack')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
