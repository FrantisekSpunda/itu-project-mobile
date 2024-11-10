import { Heading, MainDept, List, ContactItem, ExpenseItem, Button, Layout } from '@/components';
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native';
import React from 'react';

export default function Contacts() {
	return (
		<Layout>
			<Heading text='Přehled' showBack={false} showSearch={false} />
			<MainDept />
			<List
				label='Dlužníci'
				buttons={
					<>
						<Button label='Přidat' icon={<IconPlus />} />
					</>
				}
			>
				<ContactItem user={{ firstName: 'Matej', lastName: 'Krenek' }} amount={-432} />
				<ContactItem user={{ firstName: 'Pepa', lastName: 'Zdepa' }} amount={-213} />
				<ContactItem user={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ContactItem user={{ firstName: 'Bobek', lastName: 'Bob' }} amount={54} />
				<ContactItem user={{ firstName: 'Onldřich', lastName: 'Mačeta' }} amount={54} />
				<ContactItem user={{ firstName: 'Honimír', lastName: 'Krátký' }} amount={34} />
				<ContactItem user={{ firstName: 'Pepik', lastName: 'Popsisil' }} amount={0} />
				<ContactItem user={{ firstName: 'Matej', lastName: 'Popleta' }} amount={0} />
			</List>
		</Layout>
	);
}
