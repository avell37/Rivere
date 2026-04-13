import * as z from 'zod'

export const registerSchema = z.object({
	username: z
		.string()
		.min(4, { message: 'validation.username.min' })
		.max(32, { message: 'validation.username.max' }),
	email: z.string().email('validation.email'),
	password: z
		.string()
		.min(6, { message: 'validation.password.min' })
		.max(64, { message: 'validation.password.max' })
})

export type SignUpRequest = z.infer<typeof registerSchema>
