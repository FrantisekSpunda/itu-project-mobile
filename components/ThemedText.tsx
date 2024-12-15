import { Text, type TextProps } from 'react-native'

import { tw } from '@/utils/utils.tailwind'

/**
 * Text with predefined styles
 */
const styles = {
  title: tw('textTitle', 'fontBold', 'textBlack'),
  heading1: tw('textHeading1', 'fontBold', 'textBlack'),
  heading2: tw('textHeading2', 'fontBold', 'textBlack'),
  body1: tw('textBody1', 'fontMedium', 'textBlack'),
  body2: tw('textBody2', 'fontMedium', 'textBlack'),
  caption: tw('textCaption', 'fontMedium', 'textGray'),
}

export type ThemedTextProps = TextProps & {
  lightColor?: string
  darkColor?: string
  type?: keyof typeof styles
}

/**
 * Text with predefined styles
 */
export function ThemedText({ style, lightColor, darkColor, type = 'body1', ...rest }: ThemedTextProps) {
  return <Text style={[styles[type], style]} {...rest} />
}
