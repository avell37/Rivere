import z from 'zod'

export const ChangeNicknameSchema = z.object({
	nickname: z
		.string()
		.min(4, 'Минимальная длина имени пользователя - 4 символа')
		.max(32, 'Максимальная длина имени пользователя - 32 символа')
})

export type ChangeNicknameRequest = z.infer<typeof ChangeNicknameSchema>
