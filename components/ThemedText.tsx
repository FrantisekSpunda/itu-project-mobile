import { Text, type TextProps } from 'react-native'

import { useThemeColor } from '@/hooks/useThemeColor'
import { tw } from '@/utils/utils.tailwind'

const styles = {
  title: tw('textTitle', 'fontBold', 'textBlack'),
  heading1: tw('textHeading1', 'fontBold', 'textBlack'),
  heading2: tw('textHeading2', 'fontBold', 'textBlack'),
  body1: tw('textBody1', 'fontBold', 'textBlack'),
  body2: tw('textBody2', 'fontBold', 'textBlack'),
  caption: tw('textCaption', 'fontBold', 'textGray'),
}

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: keyof typeof styles
}

export function ThemedText({ style, lightColor, darkColor, type = 'body1', ...rest }: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')

  return <Text style={[{ color }, styles[type], style]} {...rest} />
}
