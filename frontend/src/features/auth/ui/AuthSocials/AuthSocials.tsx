'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { FaYandex } from 'react-icons/fa'

import { SERVER_URL } from '@/shared/libs'
import { Button } from '@/shared/ui/external'

export function AuthSocials() {
	const router = useRouter()
	const t = useTranslations('auth')

	return (
		<div className='flex flex-col gap-4 w-full'>
			<Button
				variant='outline'
				className='flex items-center rounded-xl border'
				onClick={() => router.push(`${SERVER_URL}/auth/google`)}
			>
				<FaYandex />
				{t('yandex')}
			</Button>
		</div>
	)
}
