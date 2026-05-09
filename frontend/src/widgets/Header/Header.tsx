'use client'

import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'

import { useGetUser } from '@/entities/User'

import { NotificationsVisible } from '@/features/notifications'

import { PUBLIC_URL } from '@/shared/libs'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/external'

import { UserMenu } from '../UserMenu/ui/UserMenu'

import { HeaderNavFields } from './HeaderNavFields'

export const Header = () => {
	const t = useTranslations()
	const { data: user } = useGetUser()
	const headerNavFields = HeaderNavFields({ role: user?.role, t })

	return (
		<header
			className={`flex items-center transition-all duration-200 w-full
		justify-between bg-header border-b px-4 py-2 z-10`}
		>
			<div className='flex justify-between w-full min-w-0'>
				<div className='flex items-center gap-4 max-xl:gap-2 min-w-0'>
					<BurgerMenu />
					<Link
						href={PUBLIC_URL.boards()}
						className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight hover:opacity-80 transition truncate md:mb-2 max-md:mb-1'
					>
						Rivere
					</Link>
					<nav className='hidden md:flex items-center gap-4 max-xl:gap-2'>
						{headerNavFields.map(item => (
							<Link
								key={item.title}
								href={item.url}
								className='flex items-center gap-2 px-3 py-2 max-xl:px-1 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition'
							>
								<item.icon className='w-4 h-4' />
								<span>{item.title}</span>
							</Link>
						))}
					</nav>
				</div>
				<div className='flex items-center gap-2'>
					<NotificationsVisible />
					<UserMenu />
				</div>
			</div>
		</header>
	)
}

export const BurgerMenu = () => {
	const t = useTranslations()
	const { data: user } = useGetUser()
	const headerNavFields = HeaderNavFields({ role: user?.role, t })

	const [open, setOpen] = useState(false)

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<button className='rounded-md hover:bg-muted transition md:hidden cursor-pointer'>
					<Menu className='w-5 h-5' />
				</button>
			</SheetTrigger>

			<SheetContent side='left' className='w-[260px] p-4'>
				<div className='flex flex-col gap-4 mt-6'>
					{headerNavFields.map(item => (
						<Link
							key={item.title}
							className='flex items-center gap-3 p-2 rounded-md hover:bg-muted transition'
							href={item.url}
							onClick={() => setOpen(false)}
						>
							<item.icon className='w-5 h-5' />
							<span>{item.title}</span>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}
