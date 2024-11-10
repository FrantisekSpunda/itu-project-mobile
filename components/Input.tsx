import { getColor, tw } from '@/utils/utils.tailwind';
import React, { JSXElementConstructor, ReactElement, useCallback, useRef, useState } from 'react';
import { TextInput, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

type InputPros = {
	name: string;
	label: string;
	icon?: ReactElement<any, string | JSXElementConstructor<any>>;
};

export const Input = ({ name, label, icon, ...rest }: InputPros) => {
	const [value, setValue] = useState('');
	const [isFocused, setIsFocused] = useState(false);
	const ref = useRef<TextInput>(null);

	const setState = useCallback(
		(focused: boolean) => {
			setIsFocused(focused || !!value);
		},
		[isFocused, value],
	);

	return (
		<TouchableOpacity
			onPress={() => {
				Keyboard.dismiss();
				ref.current?.focus();
			}}
			style={tw('flex', 'rounded', 'border', 'borderGray', 'pX3')}
		>
			{!!icon && React.cloneElement(icon, { style: tw('textPrimary', icon.props.style, 'mR2'), strokeWidth: 2, size: 18 })}
			<View style={tw('flexCol')}>
				<Text style={[...tw('textGray', 'fontBold'), ...[isFocused ? tw('textCaption', { paddingTop: 2, marginBottom: -1 }) : tw('textBody1', 'pT4', 'pB2')]]}>
					{label}
				</Text>

				<TextInput
					ref={ref}
					value={value}
					onChangeText={setValue}
					onFocus={() => setState(true)}
					onBlur={() => setState(false)}
					style={[...tw('pB2'), ...(isFocused ? tw() : tw('h0'))]}
				/>
			</View>
		</TouchableOpacity>
	);
};
