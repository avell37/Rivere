import z from 'zod'

export const ChangeUsernameSchema = z.object({
	username: z
		.string()
		.min(4, 'Минимальная длина имени пользователя - 4 символа')
		.max(32, 'Максимальная длина имени пользователя - 32 символа')
})

export type ChangeUsernameRequest = z.infer<typeof ChangeUsernameSchema>
