'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
	BanUserFormValues,
	BanUserSchema
} from '../validation/ban-user.z.validation'

import { useSetBanUser } from './useAdminQueries'

export const useBanUser = (userId: string) => {
	const { banUserWithReason } = useSetBanUser(userId)

	const form = useForm<BanUserFormValues>({
		resolver: zodResolver(BanUserSchema),
		defaultValues: {
			reason: '',
			durationInHours: 1
		}
	})

	const onSubmit: SubmitHandler<BanUserFormValues> = data => {
		const parsed = BanUserSchema.parse(data)

		banUserWithReason({
			userId,
			reason: parsed.reason,
			durationInHours: parsed.durationInHours
		})
	}

	return { form, onSubmit }
}
