import { NavItem } from '@/types/nav-item';
import { IconComponents, IconDashboard, IconLock } from '@tabler/icons-react';

export const navLinks: NavItem[] = [
	{ label: 'Dashboard', icon: IconDashboard, link: '/dashboard' },

	{
		label: 'Products',
		icon: IconComponents,
		initiallyOpened: true,
		links: [
			{
				label: 'Create',
				link: '/dashboard/product/create',
			},
			{
				label: 'List',
				link: '/dashboard/product/list',
			},
		],
	},
	{
		label: 'Auth',
		icon: IconLock,
		initiallyOpened: true,
		links: [
			{
				label: 'Login',
				link: '/login',
			},
			{
				label: 'Register',
				link: '/register',
			},
		],
	},
];
