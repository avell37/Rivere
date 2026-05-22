import { BoardRole } from '@/shared/utils'

export interface ManageMemberProps {
	currentUserId?: string
	currentUserRole?: BoardRole
	targetUserId: string
	targetRole: BoardRole
}

export const canRemoveMember = (
	currentUserRole: 'OWNER' | 'ADMIN' | 'MEMBER',
	targetUserRole: 'OWNER' | 'ADMIN' | 'MEMBER'
) => {
	if (currentUserRole === 'OWNER') {
		return targetUserRole !== 'OWNER'
	}

	if (currentUserRole === 'ADMIN') {
		return targetUserRole === 'MEMBER'
	}

	return false
}

export const canManageMember = ({
	currentUserId,
	currentUserRole,
	targetUserId,
	targetRole
}: ManageMemberProps) => {
	if (currentUserId === targetUserId) {
		return false
	}

	if (!currentUserRole) {
		return false
	}

	if (currentUserRole === BoardRole.OWNER) {
		return targetRole !== BoardRole.OWNER
	}

	if (currentUserRole === BoardRole.ADMIN) {
		return targetRole === BoardRole.MEMBER
	}

	return false
}
