import z from 'zod'

export const ChangeDisplayUsernameSchema = z.object({
	displayUsername: z
		.string()
		.min(4, 'Минимальная длина имени пользователя - 4 символа')
		.max(32, 'Максимальная длина имени пользователя - 32 символа')
})

export type ChangeDisplayUsernameRequest = z.infer<
	typeof ChangeDisplayUsernameSchema
>
