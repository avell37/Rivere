import * as z from 'zod'

export const emailSchema = z.object({
	email: z.string().email({ message: 'validation.email' })
})

export type EmailRequest = z.infer<typeof emailSchema>
