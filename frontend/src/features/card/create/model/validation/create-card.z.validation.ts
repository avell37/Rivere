import z from 'zod'

import { Priority } from '@/entities/Card/model/types/CardPriority'

export const CreateCardSchema = z.object({
	title: z
		.string()
		.max(32, 'Максимальная длина названия карточки - 32 символа'),
	description: z
		.string()
		.max(100, 'Максимальная длина описания карточки - 100 символов')
		.optional(),
	priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH], {
		message: 'Выберите приоритетность задачи'
	}),
	deadline: z.string().min(1)
})

export type CreateCardRequest = z.infer<typeof CreateCardSchema>
