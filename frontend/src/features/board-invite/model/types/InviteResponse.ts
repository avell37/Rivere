import { InviteBoardInfo, InviteCreator } from './InviteInfo'

export interface CreateInviteResponse {
	link: string
	expiresAt: string
}

export interface GetInviteResponse {
	board: InviteBoardInfo
	invitedBy: InviteCreator
	expiresAt: string
}
