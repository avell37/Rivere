'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { useGetUser } from '@/entities/User'

import { PUBLIC_URL } from '@/shared/libs'
import { Button } from '@/shared/ui/external'

import { UserMenu } from '@/widgets/UserMenu'

import { HeaderSettings } from './HeaderSettings'

export const MainHeader = () => {
	const { data: user } = useGetUser()
	const t = useTranslations('home')

	return (
		<header className='fixed top-0 left-0 w-full border-foreground bg-background/50 backdrop-blur-md z-50'>
			<div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link href='/' className='font-bold text-xl'>
					Rivere
				</Link>

				{user && (
					<Link href={PUBLIC_URL.boards()}>
						<Button variant='ghost'>{t('header.boards')}</Button>
					</Link>
				)}

				<div className='flex items-center gap-4'>
					{!user ? (
						<>
							<nav className='flex items-center gap-4'>
								<Link href='auth/login'>
									<Button className='cursor-pointer'>
										{t('header.login')}
									</Button>
								</Link>
								<Link href='auth/register'>
									<Button className='cursor-pointer'>
										{t('header.register')}
									</Button>
								</Link>
							</nav>
							<HeaderSettings />
						</>
					) : (
						<UserMenu />
					)}
				</div>
			</div>
		</header>
	)
}
