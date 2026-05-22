import z from 'zod'

import { BanDurationUnit } from '../types/AdminUserTypes'

export const BanUserSchema = z.object({
	reason: z.string().min(1, { message: 'validation.admin.reason.min' }),
	duration: z.coerce
		.number()
		.min(1, { message: 'validation.admin.duration.min' }),
	unit: z.enum([
		BanDurationUnit.SECONDS,
		BanDurationUnit.MINUTES,
		BanDurationUnit.HOURS,
		BanDurationUnit.DAYS
	])
})

export type BanUserFormValues = z.input<typeof BanUserSchema>
export type BanUserRequest = z.infer<typeof BanUserSchema>
