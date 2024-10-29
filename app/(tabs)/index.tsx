import React from 'react';
import { View, Text, TextInput, Button, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { tailwind } from 'react-native-tailwindcss';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Jméno je povinné'),
	email: Yup.string().email('Neplatná emailová adresa').required('Email je povinný'),
});

export default function Test() {
	return (
		<View style={tailwind.p4}>
			<Formik
				initialValues={{ name: '', email: '' }}
				validationSchema={validationSchema}
				onSubmit={(values) => {
					console.log(values);
				}}
			>
				{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
					<View style={[tailwind.bgBlue200, tailwind.p10, tailwind.flex, tailwind.]}>
						<TextInput
							style={[tailwind.border, tailwind.borderGray400, tailwind.rounded, tailwind.p2, tailwind.bgWhite]}
							placeholder='Jméno'
							onChangeText={handleChange('name')}
							onBlur={handleBlur('name')}
							value={values.name}
						/>
						{errors.name && touched.name && <Text style={tailwind.textRed600}>{errors.name}</Text>}

						<TextInput
							style={[tailwind.border, tailwind.borderGray400, tailwind.rounded, tailwind.p2, tailwind.bgWhite]}
							placeholder='Email'
							onChangeText={handleChange('email')}
							onBlur={handleBlur('email')}
							value={values.email}
						/>
						{errors.email && touched.email && <Text style={tailwind.textRed600}>{errors.email}</Text>}

						<Button title='Odeslat' />
					</View>
				)}
			</Formik>
		</View>
	);
}
