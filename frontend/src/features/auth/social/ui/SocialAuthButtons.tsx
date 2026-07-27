'use client'

import { useTranslations } from 'next-intl'

import { API_URL } from '@/shared/libs'
import { Button } from '@/shared/ui/external'

interface SocialAuthButtonsProps {
	disabled?: boolean
}

export const SocialAuthButtons = ({ disabled }: SocialAuthButtonsProps) => {
	const t = useTranslations('auth')
	const tWrapper = useTranslations('auth.wrapper')

	const handleYandexLogin = () => {
		window.location.href = API_URL.socialAuth('yandex')
	}

	return (
		<div className='flex flex-col gap-4'>
			<Button
				type='button'
				variant='outline'
				className='w-full cursor-pointer'
				disabled={disabled}
				onClick={handleYandexLogin}
			>
				{t('yandex')}
			</Button>

			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t border-border' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-card px-2 text-muted-foreground'>
						{tWrapper('formSeparator')}
					</span>
				</div>
			</div>
		</div>
	)
}
