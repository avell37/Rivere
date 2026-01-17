import * as z from 'zod'

export const loginSchema = z.object({
	login: z.string(),
	password: z
		.string()
		.min(6, { message: 'validation.password.min' })
		.max(64, { message: 'validation.password.max' })
})

export type SignInRequest = z.infer<typeof loginSchema>
