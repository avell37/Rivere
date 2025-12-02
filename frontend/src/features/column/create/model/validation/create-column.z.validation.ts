import z from 'zod'

export const CreateColumnSchema = z.object({
	title: z.string().max(32, 'Максимальная длина названия доски - 32 символа')
})

export type CreateColumnRequest = z.infer<typeof CreateColumnSchema>
