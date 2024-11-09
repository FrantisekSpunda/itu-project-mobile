import { Text, type TextProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { tw } from '@/utils/utils.tailwind';
import { tailwind } from 'react-native-tailwindcss';

const styles = {
	heading1: {},
	heading2: {},
	body1: {},
	body2: {},
	caption: {},
};

export type ThemedTextProps = TextProps & {
	lightColor?: string;
	darkColor?: string;
	type?: keyof typeof styles;
};

export function ThemedText({ style, lightColor, darkColor, type = 'body1', ...rest }: ThemedTextProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

	return <Text style={[{ color }, tailwind.bgBlack, style]} {...rest} />;
}
