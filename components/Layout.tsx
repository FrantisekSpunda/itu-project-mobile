import { View, ViewProps } from 'react-native';
import TopBar from './Topbar';
import { tw } from '@/utils/utils.tailwind';

type LayoutProps = ViewProps & {};

export const Layout = ({ children, ...rest }: LayoutProps) => {
	return (
		<View {...rest} style={tw('wFull', 'hFull', 'bgGray100')}>
			<TopBar />
			<View style={tw('flexCol', 'p3')}>{children}</View>
		</View>
	);
};
