import React from 'react';
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native';
import { Layout, Heading, MainDept, Button, List, ContactItem, ExpenseItem, SettlementItem, Box, Input } from '@/components';
import { ThemedText } from '@/components/ThemedText';
import { tw } from '@/utils/utils.tailwind';

export default function UserProfile() {
	return (
		<Layout>
			<Heading text='Úprava vašeho profilu' showSearch={false} />
			<Box style={tw({ gap: 12 })}>
				<ThemedText>Základní informace</ThemedText>
				<Input name='first_name' label='Vaše jméno' />
				<Input name='last_name' label='Vaše příjmení' />
				<Input name='email' label='Váš email' />
				<Input name='bank_iban' label='Váš bankovní účet' />
			</Box>
		</Layout>
	);
}

export const getStaticProps = () => {
	return {
		options: {
			headerShown: false, // Skrytí headeru
		},
	};
};
