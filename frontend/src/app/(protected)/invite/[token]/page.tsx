import { createPrivatePageMetadata } from '@/shared/libs'

import { InviteView } from '@/features/board-invite'

export const generateMetadata = () => createPrivatePageMetadata('invite')

export default function InvitePage() {
	return <InviteView />
}
