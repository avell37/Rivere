import z from 'zod'

export const PasswordSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, { message: 'validation.password.min' })
			.max(64, { message: 'validation.password.max' }),
		confirmPassword: z
			.string()
			.min(6, { message: 'validation.password.min' })
			.max(64, { message: 'validation.password.max' })
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'validation.password.noMatches',
		path: ['confirmPassword']
	})

export type PasswordRequest = z.infer<typeof PasswordSchema>
