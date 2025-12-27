import z from 'zod'

export const CreateColumnSchema = z.object({
	title: z
		.string()
		.max(32, 'Максимальная длина названия колонки - 32 символа')
})

export type CreateColumnRequest = z.infer<typeof CreateColumnSchema>
