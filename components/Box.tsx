import { tw } from '@/utils/utils.tailwind'
import { View, ViewProps } from 'react-native'
import { ThemedText } from './ThemedText'

export type BoxProps = ViewProps & {
  label?: string
  style?: any[]
}

/**
 * Box with label and content
 */
export const Box = ({ label, style = [], children, ...rest }: BoxProps) => {
  return (
    <View style={tw('flexCol', { gap: 8 })}>
      {label && <ThemedText style={tw('textBlack')}>{label}</ThemedText>}
      <View {...rest} style={[...tw('wFull', 'relative', 'p3', 'roundedLg', 'bgWhite', 'borderT4', 'borderPrimary'), ...style]}>
        {children}
      </View>
    </View>
  )
}
