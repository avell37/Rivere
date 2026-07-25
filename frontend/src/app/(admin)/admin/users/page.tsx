import { createAdminPageMetadata } from '@/shared/libs'

import { Users } from '@/widgets/Admin'

export const generateMetadata = () => createAdminPageMetadata('admin.users')

export default function AdminUsersPage() {
	return <Users />
}
