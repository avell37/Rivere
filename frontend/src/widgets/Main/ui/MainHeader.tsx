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
		<header className='fixed top-0 left-0 z-50 w-full border-b border-zinc-200/80 bg-white/75 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/70'>
			<Animate
				animation='fadeDown'
				duration={0.5}
				triggerOnView={false}
				className='mx-auto flex h-16 max-w-6xl items-center justify-between px-4'
			>
				<Link
					href='/'
					className='text-lg font-bold tracking-tight text-zinc-900 dark:text-white'
				>
					<span className='bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-violet-400'>
						Rivere
					</span>
				</Link>

				{user && (
					<Link href={PRIVATE_URL.boards()}>
						<Button
							variant='ghost'
							className='text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white'
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
										className='text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white'
									>
										{t('header.login')}
									</Button>
								</Link>
								<Link href='auth/register'>
									<Button className='bg-indigo-600 text-white hover:bg-indigo-500'>
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
