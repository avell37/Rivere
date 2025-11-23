import * as z from 'zod'

export const loginSchema = z.object({
	login: z.string(),
	password: z
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.max(64, 'Пароль должен содержать минимум 6 символов')
})

export type SignInRequest = z.infer<typeof loginSchema>
