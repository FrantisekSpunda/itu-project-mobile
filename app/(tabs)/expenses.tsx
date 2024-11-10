import { Button, ContactItem, ExpenseItem, Heading, Layout, List, MainDept } from '@/components';
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native';
import React from 'react';

export default function Expenses() {
	return (
		<Layout>
			<Heading text='Přehled' showBack={false} />
			<MainDept />
			<List label='Listopad 2024'>
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Krenek' }} amount={-432} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={-213} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Popleta' }} amount={0} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Onldřich', lastName: 'Mačeta' }} amount={54} />
			</List>
			<List label='Říjen 2024'>
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Krenek' }} amount={-432} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={-213} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Popleta' }} amount={0} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Onldřich', lastName: 'Mačeta' }} amount={54} />
			</List>
		</Layout>
	);
}
