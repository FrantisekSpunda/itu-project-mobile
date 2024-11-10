import React, { useEffect, useState } from 'react';
import { IconExternalLink, IconPlus } from '@tabler/icons-react-native';
import { Layout, Heading, MainDept, Button, List, ContactItem, ExpenseItem, SettlementItem } from '@/components';
import { getContact, getContacts, getExpenses } from '@/api';
import { Contact, Expense } from '@/api/types';

export default function Overview() {
	const [expenses, setExpenses] = useState<Expense[]>([]);
	const [contacts, setContacts] = useState<(Contact & { amount: number })[]>([]);

	useEffect(() => {
		getExpenses(1).then(setExpenses);
		getContact(1).then((data) => setContacts(data || []));
	}, []);

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
				{contacts.map((contact) => (
					<ContactItem user={{ firstName: contact.first_name || '', lastName: contact.last_name || '' }} amount={contact.amount} />
				))}
			</List>
			<List
				label='Výdaje'
				buttons={
					<>
						<Button label='Výdaje' icon={<IconExternalLink />} />
					</>
				}
			>
				{expenses.map((expense) =>
					expense.type == 'expense' ? (
						<ExpenseItem
							label={expense.title || ''}
							payer={{ firstName: String(expense.payer_id), lastName: '' }}
							amount={expense.amount * (expense.payer_id == 1 ? 1 : -1)}
						/>
					) : (
						<SettlementItem payer={{ firstName: String(expense.payer_id), lastName: '' }} amount={expense.amount} />
					),
				)}
			</List>
		</Layout>
	);
}
