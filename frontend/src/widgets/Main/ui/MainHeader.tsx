'use client'
import Link from 'next/link'

import { Button } from '@/shared/ui/external'

interface MainHeaderProps {
	t: (key: string) => string
}

export const MainHeader = ({ t }: MainHeaderProps) => {
	return (
		<header className='fixed top-0 left-0 w-full border-b border-foreground bg-background z-50'>
			<div className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'>
				<Link href='/' className='font-bold'>
					Rivere
				</Link>

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
			</div>
		</header>
	)
}
