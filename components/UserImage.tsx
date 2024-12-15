import { getAvatar, tw } from '@/utils'
import { View, Image, ViewProps } from 'react-native'
import { ThemedText, ThemedTextProps } from './ThemedText'
import { Contact, User } from '@/api'

const sizes: { [key: string]: { height: number; width: number; text: ThemedTextProps['type'] } } = {
  default: {
    width: 30,
    height: 30,
    text: 'body1',
  },
  small: {
    width: 20,
    height: 20,
    text: 'caption',
  },
}

type UserImageProps = ViewProps & {
  contact: Partial<Contact>
  style?: any[]
  size?: keyof typeof sizes
}

/**
 * User image component. Return google avatar or first letter of first name and last name
 */
export const UserImage = ({ contact, style, size = 'default', ...rest }: UserImageProps) => {
  return (
    <View
      {...rest}
      style={[
        ...tw(
          { width: sizes[size].width, height: sizes[size].height },
          'roundedFull',
          'bgLightGray',
          'mR3',
          'flex',
          'itemsCenter',
          'justifyCenter',
          'overflowHidden'
        ),
        ...(style || []),
      ]}
    >
      {contact.user?.avatar ? (
        <Image source={{ uri: contact.user.avatar }} style={{ width: sizes[size].width, height: sizes[size].height }} />
      ) : (
        <ThemedText type={sizes[size].text} style={tw('textCenter', 'textBlack')}>
          {getAvatar(contact?.name || '')}
        </ThemedText>
      )}
    </View>
  )
}
