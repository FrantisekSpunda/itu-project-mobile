import { View, ViewProps } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { tw } from '@/utils/utils.tailwind';
import { IconSearch, IconArrowBack } from '@tabler/icons-react-native';

type HeadingProps = ViewProps & {
	text: string;
	showSearch?: boolean;
	showBack?: boolean;
};

export const Heading = ({ text, showSearch = true, showBack = true }: HeadingProps) => {
	return (
		<View style={tw('flexRow', 'wFull')}>
			<ThemedText type='heading1'>{text}</ThemedText>
			<View style={tw('flexCol', 'wFull', 'justifyEnd', 'itemsCenter')}>
				{showSearch && <IconSearch size={24} />}
				{showBack && <IconArrowBack size={24} />}
			</View>
		</View>
	);
};
