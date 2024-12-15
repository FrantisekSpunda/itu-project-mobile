import { IconNode } from '@tabler/icons-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ThemedText } from './ThemedText'
import { tw } from '@/utils/utils.tailwind'
import React, { JSXElementConstructor, ReactElement } from 'react'

/**
 * Styles for different button types
 */
const typeStyles = {
  primary: {
    container: tw('bgPrimary', 'pX4', 'pY2'),
    text: tw('textWhite'),
    icon: tw('textWhite'),
    iconSize: 18,
  },
  white: {
    container: tw('bgWhite', 'border', 'borderLightGray', 'pX4', 'pY2'),
    text: tw('textBlack'),
    icon: tw('textBlack'),
    iconSize: 18,
  },
  transparent: {
    container: tw('bgTransparent'),
    text: tw('textBlack'),
    icon: tw('textSecondary'),
    iconSize: 20,
  },
}

export type ButtonProps = TouchableOpacityProps & {
  type: keyof typeof typeStyles
  label?: string
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  iconAfter?: boolean
  style?: any[]
}

/**
 * Button component
 */
export const Button = ({ label, icon, iconAfter, type, style, ...rest }: ButtonProps) => {
  // Clone icon
  const Icon = !!icon
    ? React.cloneElement(icon, {
        ...icon.props,
        style: [...tw('textPrimary', 'm0', iconAfter ? 'mL2' : 'mR2'), ...typeStyles[type].icon, icon.props.style],
        strokeWidth: 2,
        size: typeStyles[type].iconSize,
      })
    : null

  return (
    <TouchableOpacity
      style={[
        ...tw('flexRow', 'itemsCenter', 'roundedFull', { width: 'auto', alignSelf: 'flex-start' }),
        ...typeStyles[type].container,
        ...(style instanceof Array ? style : []),
      ]}
      {...rest}
    >
      {!iconAfter && Icon}
      <ThemedText type="body1" style={[...tw('textWhite'), ...typeStyles[type].text]}>
        {label}
      </ThemedText>
      {iconAfter && Icon}
    </TouchableOpacity>
  )
}
