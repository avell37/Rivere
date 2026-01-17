import z from 'zod'

export const EditBoardSchema = z.object({
	title: z
		.string()
		.min(4, { message: 'validation.board.min' })
		.max(32, { message: 'validation.board.max' }),

	background: z
		.object({
			color: z.string().nullable(),
			url: z.string().nullable()
		})
		.nullable()
})

export type EditBoardRequest = z.infer<typeof EditBoardSchema>
