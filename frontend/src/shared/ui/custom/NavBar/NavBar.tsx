'use client'
import { Moon, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { PRIVATE_URL } from '@/shared/libs'

export const NavBar = () => {
	const router = useRouter()

	return (
		<nav className='bg-card text-card-foreground flex gap-6 rounded-xl border py-4 px-4 shadow-sm'>
			<div
				className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
				onClick={() => router.push(PRIVATE_URL.admin())}
			>
				<Moon size={20} />
				Статистика
			</div>
			<div
				className='flex gap-2 text-sm hover:bg-muted p-2 rounded-xl cursor-pointer'
				onClick={() => router.push(PRIVATE_URL.adminUsers(1))}
			>
				<Users size={20} />
				Пользователи
			</div>
		</nav>
	)
}
