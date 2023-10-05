'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
	Box,
	Button,
	Group,
	ActionIcon,
	Paper,
	Space,
	Text,
	TextInput,
	Select,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconTrash } from '@tabler/icons-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1, { message: 'Product name is required' }),
	tax: z.number(),
	barcode: z.string().min(16, { message: 'Barcode is required' }),
	groups: z.array(
		z.object({ name: z.string(), amount: z.number(), salePrice: z.number() })
	),
});

type Product = z.infer<typeof schema>;

export const ProductForm = () => {
	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Product>({
		resolver: zodResolver(schema),
		defaultValues: {
			name: '',
			tax: 0,
			barcode: '',
			groups: [{ name: 'Group 1', amount: 1, salePrice: 1 }],
		},
	});
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'groups',
	});

	const onSubmit = (data: Product) =>
		modals.openConfirmModal({
			title: 'Product created successfully',
			children: <Text size="sm">{data.name}</Text>,
			labels: { confirm: 'Confirm', cancel: 'Cancel' },
			onConfirm: () => console.log('Confirmed'),
		});

	const addGroup = () => {
		append({ name: '', amount: 0, salePrice: 0 });
	};

	return (
		<Paper withBorder shadow="md" p="md" w="400px">
			<Box<'form'>>
				<TextInput
					label="Name"
					error={errors.name && errors.name.message}
					{...register('name')}
				/>
				<Space h="sm" />
				<Select
					data={[
						{ label: 'Tax 1', value: '1' },
						{ label: 'Tax 2', value: '2' },
						{ label: 'Tax 3', value: '3' },
					]}
					placeholder="Select Tax"
					error={errors.tax && errors.tax.message}
					label="Tax"
				/>
				<Space h="sm" />
				<TextInput
					label="Barcode"
					error={errors.barcode && errors.barcode.message}
					{...register('barcode')}
				/>
				<Space h="md" />
				{fields.length > 0 ? (
					<Group mb="xs">
						<Text fw={500} size="sm" pr={60}>
							Name
						</Text>
						<Text fw={500} size="sm" pr={50}>
							Amount
						</Text>
						<Text fw={500} size="sm">
							Sale Price
						</Text>
					</Group>
				) : (
					<Text c="dimmed" ta="center">
						Add at least one product group
					</Text>
				)}
				{fields.map((field, index) => (
					<Group key={field.id} noWrap mt="md">
						<TextInput
							{...register(`groups.${index}.name` as const)}
							defaultValue={field.name}
						/>
						<TextInput
							{...register(`groups.${index}.amount` as const)}
							defaultValue={field.amount}
						/>
						<TextInput
							{...register(`groups.${index}.salePrice` as const)}
							defaultValue={field.salePrice}
						/>
						<ActionIcon variant="transparent" color="red" onClick={() => remove(index)}>
							<IconTrash />
						</ActionIcon>
					</Group>
				))}
				<Group mt="md" position="right">
					<Button onClick={addGroup}>Add product group</Button>
				</Group>
				<Space h="sm" />
				<Button fullWidth>Create Product / Groups</Button>
			</Box>
		</Paper>
	);
};
