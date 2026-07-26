'use client'

import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useEffect } from 'react'

import { PRIVATE_URL } from '@/shared/libs'
import { RouteStatusShell } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

export default function Error({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	const t = useTranslations('system.error')

	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<RouteStatusShell
			icon={AlertTriangle}
			title={t('title')}
			description={t('description')}
			variant='destructive'
			actions={
				<>
					<Button
						type='button'
						onClick={reset}
						className='bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400'
					>
						{t('retry')}
					</Button>
					<Button type='button' variant='outline' asChild>
						<Link href={PRIVATE_URL.boards()}>{t('boards')}</Link>
					</Button>
				</>
			}
		/>
	)
}
