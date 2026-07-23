import { UseFormReturn } from 'react-hook-form'

import { ResolveReportFormValues } from '../validation/resolve-report.z.validation'

import { IReport } from './AdminReportTypes'

export interface ResolveReportFormProps {
	report: IReport
	form: UseFormReturn<ResolveReportFormValues>
	isPending?: boolean
	onSubmit: (data: ResolveReportFormValues) => void
	onCancel: () => void
}
