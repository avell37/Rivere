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
