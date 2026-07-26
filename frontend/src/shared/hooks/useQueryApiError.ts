'use client'

import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { handleApiError } from '@/shared/utils'

export const useQueryApiError = (error: unknown, enabled = true) => {
	const t = useTranslations()

	useEffect(() => {
		if (enabled && error) {
			handleApiError(error, t)
		}
	}, [enabled, error, t])
}
