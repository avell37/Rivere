import { createAdminPageMetadata } from '@/shared/libs'

import { AdminReports } from '@/widgets/Admin/reports/AdminReports'

export const generateMetadata = () => createAdminPageMetadata('admin.reports')

export default function AdminReportsPage() {
	return <AdminReports />
}
