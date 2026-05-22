export enum BoardRole {
	OWNER = 'OWNER',
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER'
}

export enum BoardPermission {
	MANAGE_BOARD = 'MANAGE_BOARD',
	DELETE_BOARD = 'DELETE_BOARD',

	MANAGE_ROLES = 'MANAGE_ROLES',
	INVITE_USERS = 'INVITE_USERS',
	KICK_USERS = 'KICK_USERS',

	CREATE_COLUMN = 'CREATE_COLUMN',
	UPDATE_COLUMN = 'UPDATE_COLUMN',
	DELETE_COLUMN = 'DELETE_COLUMN',

	CREATE_CARD = 'CREATE_CARD',
	UPDATE_CARD = 'UPDATE_CARD',
	DELETE_CARD = 'DELETE_CARD'
}

export const hasPermission = (role: BoardRole, permission: BoardPermission) => {
	return BOARD_ROLE_PERMISSIONS[role].includes(permission)
}

export const BOARD_ROLE_PERMISSIONS: Record<BoardRole, BoardPermission[]> = {
	OWNER: [
		BoardPermission.MANAGE_BOARD,
		BoardPermission.DELETE_BOARD,
		BoardPermission.MANAGE_ROLES,
		BoardPermission.INVITE_USERS,
		BoardPermission.KICK_USERS,

		BoardPermission.CREATE_COLUMN,
		BoardPermission.UPDATE_COLUMN,
		BoardPermission.DELETE_COLUMN,

		BoardPermission.CREATE_CARD,
		BoardPermission.UPDATE_CARD,
		BoardPermission.DELETE_CARD
	],

	ADMIN: [
		BoardPermission.MANAGE_BOARD,
		BoardPermission.INVITE_USERS,
		BoardPermission.KICK_USERS,

		BoardPermission.CREATE_COLUMN,
		BoardPermission.UPDATE_COLUMN,
		BoardPermission.DELETE_COLUMN,

		BoardPermission.CREATE_CARD,
		BoardPermission.UPDATE_CARD,
		BoardPermission.DELETE_CARD
	],

	MEMBER: [
		BoardPermission.CREATE_COLUMN,
		BoardPermission.UPDATE_COLUMN,

		BoardPermission.CREATE_CARD,
		BoardPermission.UPDATE_CARD
	]
}
