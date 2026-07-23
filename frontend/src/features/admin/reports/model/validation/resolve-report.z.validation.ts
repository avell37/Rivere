import z from 'zod'

import { BanDurationUnit } from '@/features/admin/users/model/types/AdminUserTypes'

export const resolveReportDecisions = [
	'DISMISS',
	'RESOLVE_NONE',
	'BAN_USER',
	'DELETE_MESSAGE'
] as const

export type ResolveReportDecision = (typeof resolveReportDecisions)[number]

export const ResolveReportFormSchema = z
	.object({
		decision: z.enum(resolveReportDecisions),
		resolutionNote: z.string().max(500).optional(),
		banReason: z.string().optional(),
		banDuration: z.coerce.number().optional(),
		banUnit: z.nativeEnum(BanDurationUnit).optional()
	})
	.superRefine((data, ctx) => {
		if (data.decision !== 'BAN_USER') return

		if (!data.banReason?.trim()) {
			ctx.addIssue({
				code: 'custom',
				message: 'validation.admin.reason.min',
				path: ['banReason']
			})
		}

		if (!data.banDuration || data.banDuration < 1) {
			ctx.addIssue({
				code: 'custom',
				message: 'validation.admin.duration.min',
				path: ['banDuration']
			})
		}

		if (!data.banUnit) {
			ctx.addIssue({
				code: 'custom',
				message: 'validation.admin.duration.min',
				path: ['banUnit']
			})
		}
	})

export type ResolveReportFormValues = z.input<typeof ResolveReportFormSchema>
export type ResolveReportFormOutput = z.infer<typeof ResolveReportFormSchema>

export interface ResolveReportPayload {
	status: 'RESOLVED' | 'DISMISSED'
	action?: 'NONE' | 'BAN_USER' | 'DELETE_MESSAGE'
	resolutionNote?: string
	ban?: {
		reason: string
		duration: number
		unit: BanDurationUnit
	}
}
