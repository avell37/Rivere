'use client'

import { Flag, Moon, ScrollText, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { useGetUser } from '@/entities/User'

import { ADMIN_URL } from '@/shared/libs'

export const NavBar = () => {
	const t = useTranslations('admin.navigationBar')
	const router = useRouter()
	const { data: user } = useGetUser()

	return (
		<nav className='bg-card text-card-foreground flex gap-6 rounded-xl border py-4 px-4 shadow-sm'>
			<div
				className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
				onClick={() => router.push(ADMIN_URL.admin())}
			>
				<Moon size={20} />
				{t('statistics')}
			</div>
			<div
				className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
				onClick={() => router.push(ADMIN_URL.adminUsers({ page: 1 }))}
			>
				<Users size={20} />
				{t('users')}
			</div>
			<div
				className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
				onClick={() => router.push(ADMIN_URL.adminReports(1))}
			>
				<Flag size={20} />
				{t('reports')}
			</div>

			{user?.role === 'CREATOR' && (
				<div
					className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
					onClick={() => router.push(ADMIN_URL.adminAudit(1))}
				>
					<ScrollText size={20} />

					{t('audit')}
				</div>
			)}
		</nav>
	)
}
