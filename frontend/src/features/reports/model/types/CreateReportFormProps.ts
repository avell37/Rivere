'use client'

import { UseFormReturn } from 'react-hook-form'

import { CreateReportFormValues } from '../validation/create-report.z.validation'

export interface CreateReportFormProps {
	form: UseFormReturn<CreateReportFormValues>
	isPending?: boolean
	onSubmit: (data: CreateReportFormValues) => void
	onCancel: () => void
	t: (key: string, values?: Record<string, string>) => string
	description: string
}
