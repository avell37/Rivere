import z from 'zod'

export const BanUserSchema = z.object({
	reason: z.string(),
	durationInHours: z.coerce.number()
})

export type BanUserFormValues = z.input<typeof BanUserSchema>
export type BanUserRequest = z.infer<typeof BanUserSchema>
