import z from 'zod'

export const EditCardSchema = z.object({
	title: z
		.string()
		.min(2, { message: 'validation.card.min' })
		.max(32, { message: 'validation.card.max' }),
	description: z
		.string()
		.max(128, { message: 'validation.card.descriptionMax' })
		.optional(),
	priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
	deadline: z.string().optional()
})

export type EditCardRequest = z.infer<typeof EditCardSchema>
