import { FileQuestion } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { PRIVATE_URL, PUBLIC_URL } from '@/shared/libs'
import { RouteStatusShell } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

export default async function NotFound() {
	const t = await getTranslations('system.notFound')

	return (
		<RouteStatusShell
			icon={FileQuestion}
			title={t('title')}
			description={t('description')}
			actions={
				<>
					<Button
						asChild
						className='bg-indigo-600 text-white hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400'
					>
						<Link href={PRIVATE_URL.boards()}>{t('boards')}</Link>
					</Button>
					<Button variant='outline' asChild>
						<Link href={PUBLIC_URL.home()}>{t('home')}</Link>
					</Button>
				</>
			}
		/>
	)
}
