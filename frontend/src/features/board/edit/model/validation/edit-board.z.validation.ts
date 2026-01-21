import z from 'zod'

export const EditBoardSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'validation.board.min' })
		.max(32, { message: 'validation.board.max' })
		.optional(),
	background: z.object({
		color: z.string().nullable(),
		url: z.string().nullable()
	})
})

export type EditBoardRequest = z.infer<typeof EditBoardSchema>
