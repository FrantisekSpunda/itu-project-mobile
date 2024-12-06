import { IconNode } from '@tabler/icons-react-native'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { ThemedText } from './ThemedText'
import { tw } from '@/utils/utils.tailwind'
import React, { JSXElementConstructor, ReactElement } from 'react'
import { TouchableHighlight } from 'react-native-gesture-handler'

const buttonTypeStyles = {
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

type ButtonProps = TouchableOpacityProps & {
  label?: string
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  iconAfter?: boolean
  type: keyof typeof buttonTypeStyles
}

export const Button = ({ label, icon, iconAfter, type, ...rest }: ButtonProps) => {
  // Clone icon
  const Icon = !!icon
    ? React.cloneElement(icon, {
        style: [...tw('textPrimary', icon.props.style, 'm0', iconAfter ? 'mL2' : 'mR2'), buttonTypeStyles[type].icon],
        strokeWidth: 2,
        size: buttonTypeStyles[type].iconSize,
      })
    : null

  return (
    <TouchableOpacity
      style={[...tw('flexRow', 'itemsCenter', 'roundedFull', { width: 'auto', alignSelf: 'flex-start' }), ...buttonTypeStyles[type].container]}
      {...rest}
    >
      {!iconAfter && Icon}
      <ThemedText type="body1" style={[...tw('textWhite'), ...buttonTypeStyles[type].text]}>
        {label}
      </ThemedText>
      {iconAfter && Icon}
    </TouchableOpacity>
  )
}
