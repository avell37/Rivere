import z from 'zod'

export const ChangeUsernameSchema = z.object({
	username: z
		.string()
		.min(4, { message: 'validation.username.min' })
		.max(32, { message: 'validation.username.max' })
})

export type ChangeUsernameRequest = z.infer<typeof ChangeUsernameSchema>
