import React from 'react';
import { View, Text, TextInput, Button, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { tailwind } from 'react-native-tailwindcss';
import { Layout } from '@/components/Layout';
import { Heading } from '@/components/Heading';
import { tw } from '@/utils/utils.tailwind';

export default function Overview() {
	return (
		<Layout>
			<Heading text='Ppřehled' />
			<View style={tw('wFull', 'h10', 'roundedSm', 'bgWhite')}></View>
		</Layout>
	);
}
