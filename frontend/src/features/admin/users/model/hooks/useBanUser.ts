'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { BanDurationUnit } from '../types/AdminUserTypes'
import {
	BanUserFormValues,
	BanUserSchema
} from '../validation/ban-user.z.validation'

import { useSetBanUser } from './useAdminQueries'

export const useBanUser = (userId: string) => {
	const t = useTranslations()
	const { banUserWithReason, isPending } = useSetBanUser(userId)

	const form = useForm<BanUserFormValues>({
		resolver: zodResolver(BanUserSchema),
		defaultValues: {
			reason: '',
			duration: 1,
			unit: BanDurationUnit.HOURS
		}
	})

	const onSubmit: SubmitHandler<BanUserFormValues> = data => {
		const parsed = BanUserSchema.parse(data)

		banUserWithReason(
			{
				userId,
				reason: parsed.reason,
				duration: parsed.duration,
				unit: parsed.unit
			},
			{
				onSuccess: () => {
					toast.success(t('admin.users.actions.userBanned'))
				}
			}
		)
	}

	return {
		form,
		banPending: isPending,
		onSubmit
	}
}
