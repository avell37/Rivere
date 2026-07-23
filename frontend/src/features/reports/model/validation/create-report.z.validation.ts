import z from 'zod'

export const CreateReportFormSchema = z.object({
	reason: z
		.string()
		.min(4, { message: 'validation.report.reason.min' })
		.max(500, { message: 'validation.report.reason.max' }),
	details: z
		.string()
		.max(1000, { message: 'validation.report.details.max' })
})

export type CreateReportFormValues = z.infer<typeof CreateReportFormSchema>
