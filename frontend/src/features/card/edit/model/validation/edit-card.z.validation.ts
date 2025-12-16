import z from 'zod'

export const EditCardSchema = z.object({
	title: z
		.string()
		.min(4, 'Минимальная длина названия карточки - 32 символа'),
	description: z.string().optional()
})
