import z from 'zod'

export const EditColumnSchema = z.object({
	title: z
		.string()
		.max(32, 'Максимальная длина названия колонки - 32 символа')
})

export type EditColumnRequest = z.infer<typeof EditColumnSchema>
