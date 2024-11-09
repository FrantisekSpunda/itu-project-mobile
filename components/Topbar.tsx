import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { tailwind } from 'react-native-tailwindcss';
import { IconUser } from '@tabler/icons-react-native'; // adjust import based on your setup
import { tw } from '@/utils/utils.tailwind';

const TopBar = () => {
	return (
		<View style={[tailwind.bgWhite]}>
			<StatusBar barStyle='dark-content' backgroundColor='#ffffff' />
			<View style={tw('flexRow', 'justifyBetween', 'itemsCenter', 'p2')}>
				<Text style={[tailwind.textLg, tailwind.fontBold]}>My xd</Text>
				<TouchableOpacity style={tw('roundedFull', 'bgGray100', 'p2')}>
					<IconUser size={24} color='black' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TopBar;
