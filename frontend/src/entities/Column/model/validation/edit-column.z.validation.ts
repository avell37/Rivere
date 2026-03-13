import z from 'zod'

export const EditColumnSchema = z.object({
	title: z
		.string()
		.min(4, { message: 'validation.column.min' })
		.max(32, { message: 'validation.column.max' })
})

export type EditColumnRequest = z.infer<typeof EditColumnSchema>
