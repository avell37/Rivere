import z from 'zod'

export const ChangeEmailSchema = z.object({
	email: z.string().email('validation.email')
})

export type ChangeEmailRequest = z.infer<typeof ChangeEmailSchema>
