import { tw } from '@/utils/utils.tailwind'
import { TouchableOpacity, View, ViewProps, Image } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { IconCreditCard, IconExclamationCircleFilled } from '@tabler/icons-react-native'
import { useNavigation, useRouter } from 'expo-router'
import { Contact } from '@/api/types'
import { formatPrice, getAvatar } from '@/utils'
import { UserImage } from './UserImage'
import { useStore } from '@/hooks'

type ContactItemProps = ViewProps & {
  contact: Contact
}

export const ContactItem = ({ contact, ...rest }: ContactItemProps) => {
  const { setStore } = useStore()
  const { push } = useRouter()

  const settleWithContact = () => {
    if (contact.bank_iban || contact.bank_account || contact.user?.bank_iban || contact.user?.bank_account) push(`/settlement/create/${contact.id}`)
    else {
      setStore('flashMessage', {
        show: true,
        style: tw('bgRed'),
        content: (
          <View style={tw('flexRow', 'itemsCenter', 'p4', { gap: 12 })}>
            <IconExclamationCircleFilled size={24} fill="white" />
            <ThemedText style={tw('textWhite')}>Uživatel nemá vyplnění číslo účtu</ThemedText>
          </View>
        ),
      })
    }
  }

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
            onPress={() => settleWithContact()}
          >
            <IconCreditCard size={18} style={tw('textBlack')} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
