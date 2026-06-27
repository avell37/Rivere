'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { useGetUser } from '@/entities/User'

import { PRIVATE_URL } from '@/shared/libs'
import { Animate } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { UserMenu } from '@/widgets/UserMenu'

import { HeaderSettings } from './HeaderSettings'

export const MainHeader = () => {
	const { data: user } = useGetUser()
	const t = useTranslations('home')

	return (
		<header className='fixed top-0 left-0 w-full border-b border-white/5 bg-zinc-950/70 backdrop-blur-xl z-50'>
			<Animate
				animation='fadeDown'
				duration={0.5}
				triggerOnView={false}
				className='max-w-6xl mx-auto px-4 h-16 flex items-center justify-between'
			>
				<Link
					href='/'
					className='font-bold text-lg text-white tracking-tight'
				>
					<span className='bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-violet-400'>
						Rivere
					</span>
				</Link>

				{user && (
					<Link href={PRIVATE_URL.boards()}>
						<Button
							variant='ghost'
							className='text-zinc-400 hover:text-white hover:bg-white/5'
						>
							{t('header.boards')}
						</Button>
					</Link>
				)}

				<div className='flex items-center gap-3'>
					{!user ? (
						<>
							<nav className='flex items-center gap-2'>
								<Link href='auth/login'>
									<Button
										variant='ghost'
										className='text-zinc-400 hover:text-white hover:bg-white/5'
									>
										{t('header.login')}
									</Button>
								</Link>
								<Link href='auth/register'>
									<Button className='bg-indigo-600 hover:bg-indigo-500 text-white'>
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
			</Animate>
		</header>
	)
}
