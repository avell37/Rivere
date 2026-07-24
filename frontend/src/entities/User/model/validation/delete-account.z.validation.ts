import z from 'zod'

export const DeleteAccountSchema = z.object({
	currentPassword: z.string().min(6)
})

export type DeleteAccountValues = z.infer<typeof DeleteAccountSchema>
