'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Button } from '@/shared/ui/external'

import { HeaderSettings } from './HeaderSettings'

export const MainHeader = () => {
	const t = useTranslations('home')

	return (
		<header className='fixed top-0 left-0 w-full border-b border-foreground bg-background z-50'>
			<div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link href='/' className='font-bold text-xl'>
					Rivere
				</Link>

				<div className='flex items-center gap-4'>
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
				</div>
			</div>
		</header>
	)
}
