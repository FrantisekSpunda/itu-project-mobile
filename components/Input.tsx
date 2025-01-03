import { tw } from '@/utils/utils.tailwind'
import { useFormikContext } from 'formik'
import React, { forwardRef, JSXElementConstructor, ReactElement, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps, TextInputProps } from 'react-native'
import { ThemedText } from './ThemedText'

type InputPros = ViewProps & {
  name: string
  label: string
  type?: TextInputProps['autoComplete']
  inputProps?: TextInputProps
  containerProps?: ViewProps
  icon?: ReactElement<any, string | JSXElementConstructor<any>>
  value?: string
  onChange?: (params?: any) => any
  onBlur?: (params?: any) => any
  error?: any
  focusNext?: () => any
  style?: any[]
  readOnly?: boolean
}

/**
 * Input component
 */
export const Input = forwardRef<TextInput, InputPros>(
  ({ name, type = 'off', readOnly, inputProps = {}, containerProps = {}, label, icon, value, onChange, onBlur, error, focusNext, ...rest }, globalRef) => {
    const ref = useRef<TextInput>(null)

    useImperativeHandle(globalRef, () => ref.current as TextInput)

    const [filled, setFilled] = useState(!!value)

    // Change input state
    useEffect(() => {
      setState(false)
    }, [value])

    // Set state of focus depending on input focus and input value
    const setState = useCallback((focused: boolean) => setFilled(!!(focused || value)), [value])

    return (
      <View {...rest} style={[...tw('flexCol', 'wFull', 'relative', { gap: 4 }), ...(rest.style || [])]}>
        <View
          {...containerProps}
          onTouchEnd={() => {
            setTimeout(() => {
              ref.current?.focus()
            }, 100)
          }}
          style={[
            ...tw('flexRow', 'itemsCenter', 'rounded', 'border', 'borderLightGray', 'pX3', 'wFull', ...(readOnly ? (['bgLightGray', 'opacity50'] as any) : [])),
            ...((containerProps.style as any[]) || []),
          ]}
        >
          {!!icon && React.cloneElement(icon, { style: tw('textBlack', icon.props.style, 'mR2'), strokeWidth: 2, size: 24 })}

          <View style={tw('flexCol', 'wFull')}>
            <Text style={[...tw('textGray'), ...(filled ? tw('textCaption', { paddingTop: 6, marginBottom: -8 }) : tw('textBody1', 'pT4', 'pB0'))]}>
              {label}
            </Text>

            <TextInput
              {...inputProps}
              {...(focusNext
                ? {
                    submitBehavior: 'submit',
                    returnKeyType: 'next',
                    onSubmitEditing: focusNext,
                  }
                : {})}
              ref={ref}
              readOnly={readOnly}
              value={value}
              onChangeText={onChange}
              onFocus={() => setState(true)}
              onBlur={(e) => {
                if (onBlur) onBlur(e)
                setState(false)
              }}
              style={[...tw('pB2', 'pL0', 'textBody1', 'fontMedium', 'wFull'), ...(filled ? tw('pB3') : tw('h0', 'pB2'))]}
            />
          </View>
        </View>
        {error && (
          <ThemedText type="caption" style={tw('textRed')}>
            {error}
          </ThemedText>
        )}
      </View>
    )
  }
)
