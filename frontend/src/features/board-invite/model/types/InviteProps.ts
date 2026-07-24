import { InviteBoardInfo, InviteCreator } from './InviteInfo'

export interface CreateInviteResponse {
	link: string
	expiresAt: string
}

export interface GetInviteResponse {
	board: InviteBoardInfo
	invitedBy: InviteCreator
	expiresAt: string
	isMember: boolean
}

export interface InviteEffectsProps {
	inviteData?: GetInviteResponse
	inviteDataIsError: boolean
	inviteDataError: unknown
}

export type InviteSearchUser = {
	id: string
	username: string
	nickname: string
	avatar?: string | null
}
