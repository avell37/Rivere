import { createAdminPageMetadata } from '@/shared/libs'

import { Admin } from '@/widgets/Admin'

export const generateMetadata = () => createAdminPageMetadata('admin')

export default function AdminPage() {
	return <Admin />
}
