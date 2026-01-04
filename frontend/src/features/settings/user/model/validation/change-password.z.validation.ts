import z from 'zod'

export const ChangePasswordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(6, { message: 'validation.password.min' })
			.max(64, { message: 'validation.password.max' }),
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
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>
