'use client'

import { Menu } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { NotificationsVisible } from '@/features/notifications'

import { PUBLIC_URL } from '@/shared/libs'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/external'

import { UserMenu } from '../UserMenu/ui/UserMenu'

import { HeaderNavFields } from './HeaderNavFields'

export const Header = () => {
	const t = useTranslations()
	const headerNavFields = HeaderNavFields(t)

	return (
		<header
			className={`flex items-center transition-all duration-200 w-full
		justify-between bg-background border-b px-4 py-2 z-10`}
		>
			<div className='flex items-center justify-between w-full'>
				<div className='flex items-center gap-6'>
					<BurgerMenu />
					<Link
						href={PUBLIC_URL.boards()}
						className='text-3xl font-bold tracking-tight hover:opacity-80 transition mb-2'
					>
						Rivere
					</Link>
					<nav className='hidden md:flex items-center gap-4'>
						{headerNavFields.map(item => (
							<Link
								key={item.title}
								href={item.url}
								className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition'
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
	const headerNavFields = HeaderNavFields(t)

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button className='p-2 rounded-md hover:bg-muted transition md:hidden'>
					<Menu className='w-5 h-5' />
				</button>
			</SheetTrigger>

			<SheetContent side='left' className='w-[260px] p-4'>
				<div className='flex flex-col gap-4 mt-6'>
					{headerNavFields.map(item => (
						<Link
							key={item.title}
							href={item.url}
							className='flex items-center gap-3 p-2 rounded-md hover:bg-muted transition'
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
