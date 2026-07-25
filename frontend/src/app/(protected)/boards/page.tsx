import { createPrivatePageMetadata } from '@/shared/libs'

import { Boards } from '@/widgets'

export const generateMetadata = () => createPrivatePageMetadata('boards')

export default function BoardsPage() {
	return <Boards />
}
