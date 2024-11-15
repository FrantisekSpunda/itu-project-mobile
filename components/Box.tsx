import { tw } from '@/utils/utils.tailwind';
import { View, ViewProps } from 'react-native';

type BoxProps = ViewProps & {
	style?: any[];
};

export const Box = ({ style = [], children, ...rest }: BoxProps) => {
	return (
		<View {...rest} style={[...tw('wFull', 'relative', 'p3', 'roundedLg', 'bgWhite', 'overflowHidden'), ...style]}>
			<View style={tw({ width: '110%' }, 'absolute', 'top0', 'left0', 'bgPrimary', 'h1')} />
			{children}
		</View>
	);
};
