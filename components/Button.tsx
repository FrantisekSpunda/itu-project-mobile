import { IconNode } from '@tabler/icons-react-native';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { ThemedText } from './ThemedText';
import { tw } from '@/utils/utils.tailwind';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { TouchableHighlight } from 'react-native-gesture-handler';

type ButtonType = 'default' | 'filled';

type ButtonProps = TouchableOpacityProps & {
	label?: string;
	icon?: ReactElement<any, string | JSXElementConstructor<any>>;
	type?: ButtonType;
};

export const Button = ({ label, icon, type = 'default', ...rest }: ButtonProps) => {
	return (
		<TouchableOpacity style={tw('flexRow')} {...rest}>
			{!!icon && React.cloneElement(icon, { style: tw('textPrimary', icon.props.style, 'mR2'), strokeWidth: 2, size: 18 })}
			<ThemedText style={tw()}>{label}</ThemedText>
		</TouchableOpacity>
	);
};
