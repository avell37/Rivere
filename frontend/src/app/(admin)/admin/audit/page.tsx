import { createAdminPageMetadata } from '@/shared/libs'

import { AdminAudit } from '@/widgets/Admin/audit/AdminAudit'

export const generateMetadata = () => createAdminPageMetadata('admin.audit')

export default function AdminAuditPage() {
	return <AdminAudit />
}
