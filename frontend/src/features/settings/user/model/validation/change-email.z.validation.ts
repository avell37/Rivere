import z from 'zod'

export const ChangeEmailSchema = z.object({
	email: z.email()
})

export type ChangeEmailRequest = z.infer<typeof ChangeEmailSchema>
