import { Tabs } from 'expo-router'
import React from 'react'

import { IconBasket, IconHome, IconUserDollar } from '@tabler/icons-react-native'
import { getColor, tw } from '@/utils/utils.tailwind'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: getColor('Primary'),
        headerShown: false,
        tabBarInactiveTintColor: getColor('Black'),
        tabBarStyle: tw('bgWhite', 'borderWhite', 'shadowNone'),
        tabBarShowLabel: false,
        animation: 'shift',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Overview',
          tabBarIcon: ({ color }) => <IconHome color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconUserDollar color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconBasket color={color} size={24} />,
        }}
      />
    </Tabs>
  )
}
