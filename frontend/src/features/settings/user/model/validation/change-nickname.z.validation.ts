import z from 'zod'

export const ChangeNicknameSchema = z.object({
	nickname: z
		.string()
		.min(4, { message: 'validation.nickname.min' })
		.max(32, { message: 'validation.nickname.max' })
})

export type ChangeNicknameRequest = z.infer<typeof ChangeNicknameSchema>
