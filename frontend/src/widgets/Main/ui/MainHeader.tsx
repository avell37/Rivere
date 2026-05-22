'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { useGetUser } from '@/entities/User'

import { PRIVATE_URL } from '@/shared/libs'
import { Button } from '@/shared/ui/external'

import { UserMenu } from '@/widgets/UserMenu'

import { HeaderSettings } from './HeaderSettings'

export const MainHeader = () => {
	const { data: user } = useGetUser()
	const t = useTranslations('home')

	return (
		<header className='fixed top-0 left-0 w-full border-foreground bg-main-header/50 backdrop-blur-md z-50'>
			<div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link href='/' className='font-bold text-xl text-white'>
					Rivere
				</Link>

				{user && (
					<Link href={PRIVATE_URL.boards()}>
						<Button variant='ghost' className='text-white'>
							{t('header.boards')}
						</Button>
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
						<UserMenu isMainPage />
					)}
				</div>
			</div>
		</header>
	)
}
