import { tw } from '@/utils/utils.tailwind';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

const sizeStyle = {
	small: tw('flex', 'rounded', 'border', 'borderLightGray', 'bgWhite', 'textCaption', 'pX2', { paddingVertical: 2 }),
	medium: tw('rounded', 'border', 'borderLightGray', 'bgWhite', 'textBody1', 'pX3', 'pY1'),
};

type BadgeProps = {
	label: string;
	size?: keyof typeof sizeStyle;
};

export const Badge = ({ label, size = 'small' }: BadgeProps) => {
	return <ThemedText style={[...tw('flex'), ...sizeStyle[size]]}>{label}</ThemedText>;
};
