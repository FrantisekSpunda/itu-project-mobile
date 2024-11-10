import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { IconBasket, IconHome, IconUserDollar, IconPlus } from '@tabler/icons-react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { tailwind } from 'react-native-tailwindcss';
import { getColor, tw } from '@/utils/utils.tailwind';
import { TouchableOpacity } from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: getColor('Primary'),
				headerShown: false,
				tabBarInactiveTintColor: getColor('Black'),
				tabBarStyle: tw('bgWhite', 'borderWhite', 'shadowNone'),
				tabBarShowLabel: false,
			}}
		>
			<Tabs.Screen
				name='index'
				options={{
					title: 'Overview',
					tabBarIcon: ({ color }) => <IconHome color={color} size={24} />,
				}}
			/>
			<Tabs.Screen
				name='contacts'
				options={{
					title: 'Home',
					tabBarIcon: ({ color }) => <IconUserDollar color={color} size={24} />,
				}}
			/>
			<Tabs.Screen
				name='expenses'
				options={{
					title: 'Explore',
					tabBarIcon: ({ color }) => <IconBasket color={color} size={24} />,
				}}
			/>
		</Tabs>
	);
}
