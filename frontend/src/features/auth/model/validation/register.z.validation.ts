import * as z from 'zod'

export const registerSchema = z.object({
	username: z
		.string()
		.max(32, 'Имя пользователя должно содержать максимум 32 символа'),
	email: z.string().email('Введите корректный email адрес'),
	password: z
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(64, 'Пароль должен содержать минимум 6 символов')
})

export type SignUpRequest = z.infer<typeof registerSchema>
