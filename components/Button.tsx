import { IconNode } from '@tabler/icons-react-native';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { tw } from '@/utils/utils.tailwind';
import React, { JSXElementConstructor, ReactElement } from 'react';

type ButtonType = 'default' | 'filled';

type ButtonProps = {
	label?: string;
	icon?: ReactElement<any, string | JSXElementConstructor<any>>;
	type?: ButtonType;
};

export const Button = ({ label, icon, type = 'default', ...rest }: ButtonProps) => {
	return (
		<TouchableOpacity style={tw('flexRow')} {...rest}>
			{icon}
			{!!icon && React.cloneElement(icon, { style: tw('textPrimary', icon.props.style, 'mR2'), strokeWidth: 2, size: 18 })}
			<ThemedText style={tw()}>{label}</ThemedText>
		</TouchableOpacity>
	);
};
