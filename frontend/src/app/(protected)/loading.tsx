import { getTranslations } from 'next-intl/server'

import { RouteLoadingShell } from '@/shared/ui/custom'

export default async function ProtectedLoading() {
	const t = await getTranslations('system')

	return <RouteLoadingShell label={t('loading')} />
}
