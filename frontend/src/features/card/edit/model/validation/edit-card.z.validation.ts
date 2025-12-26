import z from 'zod'

export const EditCardSchema = z.object({
	title: z
		.string()
		.min(4, 'Минимальная длина названия карточки - 32 символа'),
	description: z
		.string()
		.min(6, 'Минимальная длина описания карточки - 6 символов')
		.max(128, 'Максимальная длина описания карточки - 128 символов')
		.optional(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
	deadline: z.string().optional()
})

export type EditCardRequest = z.infer<typeof EditCardSchema>
