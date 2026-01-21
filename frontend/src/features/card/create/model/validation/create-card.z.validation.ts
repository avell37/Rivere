import z from 'zod'

import { Priority } from '@/entities/Card'

export const CreateCardSchema = z.object({
	title: z
		.string()
		.min(4, { message: 'validation.card.min' })
		.max(32, { message: 'validation.card.max' }),
	description: z
		.string()
		.max(100, { message: 'validation.card.descriptionMax' })
		.optional(),
	priority: z.enum([Priority.LOW, Priority.MEDIUM, Priority.HIGH], {
		message: 'validation.card.priority'
	}),
	deadline: z.string({ message: 'validation.card.priority' }).min(1)
})

export type CreateCardRequest = z.infer<typeof CreateCardSchema>
