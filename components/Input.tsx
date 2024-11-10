import { getColor, tw } from '@/utils/utils.tailwind';
import React, { JSXElementConstructor, ReactElement, useCallback, useEffect, useRef, useState } from 'react';
import { TextInput, Text, View, TouchableOpacity, Keyboard, ViewProps } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

type InputPros = ViewProps & {
	name: string;
	label: string;
	icon?: ReactElement<any, string | JSXElementConstructor<any>>;
	value?: string;
	onChange?: (params?: any) => any;
	onBlur?: (params?: any) => any;
	error?: any;
};

export const Input = ({ name, label, icon, value, onChange, onBlur, error, ...rest }: InputPros) => {
	const [isFocused, setIsFocused] = useState(!!value);
	console.log(!!value, isFocused);
	const ref = useRef<TextInput>(null);

	useEffect(() => {
		setIsFocused(!!value);
	}, [value]);

	const setState = useCallback(
		(focused: boolean) => {
			setIsFocused(focused || !!value);
		},
		[isFocused, value],
	);

	return (
		<View {...rest} style={tw('flexCol', 'wFull', { gap: 4 })}>
			<TouchableOpacity
				onPress={() => {
					Keyboard.dismiss();
					ref.current?.focus();
				}}
				style={tw('flex', 'rounded', 'border', 'borderGray', 'pX3')}
			>
				{!!icon && React.cloneElement(icon, { style: tw('textPrimary', icon.props.style, 'mR2'), strokeWidth: 2, size: 18 })}
				<View style={tw('flexCol')}>
					<Text
						style={[...tw('textGray', 'fontBold'), ...[isFocused ? tw('textCaption', { paddingTop: 2, marginBottom: -1 }) : tw('textBody1', 'pT4', 'pB2')]]}
					>
						{label}
					</Text>

					<TextInput
						ref={ref}
						value={value}
						onChangeText={onChange}
						onFocus={() => setState(true)}
						onBlur={(e) => {
							if (onBlur) onBlur(e);
							setState(false);
						}}
						style={[...tw('pB2'), ...(isFocused ? tw() : tw('h0'))]}
					/>
				</View>
			</TouchableOpacity>
			{error && <Text style={tw('textCaption', 'textRed', 'fontMedium')}>{error}</Text>}
		</View>
	);
};
