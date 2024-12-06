import { tailwind } from 'react-native-tailwindcss'
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native'

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle }
type Colors = 'Black' | 'White' | 'Primary' | 'Green' | 'Red' | 'Gray' | 'Background' | 'LightGray' | 'Secondary' | 'Blue' | 'LightBlue'
type PropertyColor = 'border' | 'text' | 'bg'

type TailwindClass =
  | keyof typeof tailwind
  | `${PropertyColor}${Colors}`
  | 'fontSans'
  | 'fontSerif'
  | 'textTitle'
  | 'textHeading1'
  | 'textHeading2'
  | 'textBody1'
  | 'textBody2'
  | 'textCaption'

export const tw = (...styles: (TailwindClass | ViewStyle | TextStyle | ImageStyle)[]) => {
  return styles.map((style) => {
    if (typeof style == 'string') return tailwind[style as keyof typeof tailwind]
    else return StyleSheet.create({ default: styles as any })['default']
  })
}

export const getColor = (color: Colors): string => {
  return (tailwind as any)[`bg${color}`]['backgroundColor']
}
