import React from 'react';
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native';
import { Layout, Heading, MainDept, Button, List, ContactItem, ExpenseItem, SettlementItem } from '@/components';

export default function Overview() {
	return (
		<Layout>
			<Heading text='Přehled' showBack={false} />
			<MainDept />
			<List
				label='Dlužníci'
				buttons={
					<>
						<Button label='Dlužníci' icon={<IconExternalLink />} />
						<Button label='Přidat' icon={<IconPlus />} />
					</>
				}
			>
				<ContactItem user={{ firstName: 'Matej', lastName: 'Krenek' }} amount={-432} />
				<ContactItem user={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={-213} />
				<ContactItem user={{ firstName: 'Matej', lastName: 'Popleta' }} amount={0} />
				<ContactItem user={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ContactItem user={{ firstName: 'Onldřich', lastName: 'Mačeta' }} amount={54} />
			</List>
			<List
				label='Výdaje'
				buttons={
					<>
						<Button label='Výdaje' icon={<IconExternalLink />} />
					</>
				}
			>
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Krenek' }} amount={-432} />
				<SettlementItem payer={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={123} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={-213} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Matej', lastName: 'Popleta' }} amount={0} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ExpenseItem label='Lidl - nákup' payer={{ firstName: 'Onldřich', lastName: 'Mačeta' }} amount={54} />
			</List>
		</Layout>
	);
}
