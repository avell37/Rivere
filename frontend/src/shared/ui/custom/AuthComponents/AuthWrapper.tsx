'use client'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'

import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/external'

import { LanguageSwitcher } from '../LanguageSwitcher/ui/LanguageSwitcher'
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher'

interface AuthWrapperProps {
	children: React.ReactNode
	btnLabel?: string
	btnHref?: string
	showHeader?: boolean
	isRegistration?: boolean
}

export const AuthWrapper = ({
	children,
	btnLabel,
	btnHref,
	showHeader = true,
	isRegistration = false
}: AuthWrapperProps) => {
	const t = useTranslations('auth.wrapper')

	return (
		<div className='flex'>
			<div className='relative w-3/4 max-lg:hidden'>
				<Image
					src='/icons/vector.jpg'
					alt='bg'
					fill
					className='object-cover'
					quality={100}
				/>
				<div className='absolute inset-0 bg-black/50' />
				<div className='absolute inset-0 flex flex-col items-start justify-center p-8'>
					<span className='absolute top-6 text-7xl italic text-pink-300/60 font-bold'>
						{t('plug')}
					</span>
					<div className='flex flex-col gap-8'>
						<h1 className='text-6xl font-bold text-white'>
							{t('heading')}
						</h1>
						<p className='text-lg text-gray-400/60 max-w-[600px]'>
							{t('description')}
						</p>
					</div>
				</div>
				<div
					className='absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 
					backdrop-blur-md px-3 py-2 rounded-xl border border-white/10'
				>
					<LanguageSwitcher variant='alone' />
					<div className='w-px h-5 bg-white/20' />
					<ThemeSwitcher variant='alone' />
				</div>
			</div>
			<div className='min-h-screen flex justify-center items-center w-1/2 z-10 max-lg:w-full'>
				<div className='text-card-foreground w-full h-full'>
					<Card className='bg-muted dark:bg-card border-none shadow-none h-full rounded-none flex flex-col px-10 justify-center'>
						{showHeader && (
							<>
								<CardHeader className='text-start  pt-6'>
									<CardTitle className='font-bold text-2xl'>
										{isRegistration
											? t('registerTitle')
											: t('loginTitle')}
									</CardTitle>
									<CardDescription>
										{isRegistration
											? t('registerDescription')
											: t('loginDescription')}
									</CardDescription>
								</CardHeader>
							</>
						)}
						<CardContent>{children}</CardContent>
						{btnLabel && btnHref && (
							<CardFooter>
								<Button
									type='submit'
									variant='none'
									size='none'
									className='w-full mt-5'
									asChild
								>
									<Link href={btnHref}>{btnLabel}</Link>
								</Button>
							</CardFooter>
						)}
					</Card>
				</div>
			</div>
		</div>
	)
}
