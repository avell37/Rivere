import z from 'zod'

export const CreateBoardSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'validation.board.min' })
		.max(32, { message: 'validation.board.max' }),
	background: z.object({
		color: z.string().nullable(),
		url: z.string().nullable()
	})
})

export type CreateBoardRequest = z.infer<typeof CreateBoardSchema>
