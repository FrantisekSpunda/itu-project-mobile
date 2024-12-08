import { tw } from '@/utils/utils.tailwind'
import { TextProps, View } from 'react-native'
import { ThemedText } from '@/components/ThemedText'

const sizeStyle = {
  small: tw('rounded', 'border', 'borderLightGray', 'bgWhite', 'textCaption', 'pX2', { paddingVertical: 2 }),
  medium: tw('rounded', 'border', 'borderLightGray', 'bgWhite', 'textBody1', 'pX3', 'pY1'),
}

type BadgeProps = TextProps & {
  label: string
  size?: keyof typeof sizeStyle
}

export const Badge = ({ label, size = 'small', style, ...rest }: BadgeProps) => {
  return (
    <ThemedText style={[...tw('flex', 'selfStart'), ...sizeStyle[size], ...(style instanceof Array ? style : [])]} {...rest}>
      {label}
    </ThemedText>
  )
}
