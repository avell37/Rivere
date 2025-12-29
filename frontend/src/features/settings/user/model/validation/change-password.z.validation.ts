import z from 'zod'

export const ChangePasswordSchema = z
	.object({
		currentPassword: z
			.string()
			.min(6, 'Минимальная длина пароля - 6 символов')
			.max(64, 'Максимальная длина пароля - 64 символа'),
		newPassword: z
			.string()
			.min(6, 'Минимальная длина пароля - 6 символов')
			.max(64, 'Максимальная длина пароля - 64 символа'),
		confirmPassword: z
			.string()
			.min(6, 'Минимальная длина пароля - 6 символов')
			.max(64, 'Максимальная длина пароля - 64 символа')
	})
	.refine(data => data.newPassword === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword']
	})

export type ChangePasswordRequest = z.infer<typeof ChangePasswordSchema>
