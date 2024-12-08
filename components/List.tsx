import { View, ViewProps } from 'react-native'
import { ThemedText } from '@/components/ThemedText'
import { Button } from '@/components/Button'
import { tw } from '@/utils/utils.tailwind'
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native'

type ListProps = ViewProps & {
  label?: string
  buttons?: React.ReactNode
}

export const List = ({ label, children, buttons, ...rest }: ListProps) => {
  return (
    <View>
      {!!label && <ThemedText style={tw('mB2')}>{label}</ThemedText>}
      <View style={tw('roundedLg', 'bgWhite', 'wFull')}>
        {children}
        {!!buttons && <View style={tw('p3', 'flexRow', 'justifyEnd', { gap: 12 })}>{buttons}</View>}
      </View>
    </View>
  )
}
