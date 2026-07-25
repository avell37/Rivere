import { UseFormReturn } from 'react-hook-form'

import { ResolveReportFormValues } from '../validation/resolve-report.z.validation'

import { IReport } from './AdminReportTypes'

export interface UseResolveReportFormProps {
	report: IReport
	form: UseFormReturn<ResolveReportFormValues>
}

export interface ResolveReportFormProps extends UseResolveReportFormProps {
	isPending?: boolean
	onSubmit: (data: ResolveReportFormValues) => void
	onCancel: () => void
}
