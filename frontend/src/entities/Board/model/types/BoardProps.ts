'use client'
import { useTranslations } from 'next-intl'

import { ICard } from '@/entities/Card'
import { IColumn } from '@/entities/Column'

import { BoardRole } from '@/shared/utils'

import { SettingsTab } from '../lib/boardSettingsSidebar'

import { IBoardMember } from './IBoardMember'

export interface BoardItemProps {
	id: string
	title: string
	members: number
	background: {
		url: string | null
		color: string | null
	}
	isFavorite?: boolean
}

export interface BoardMembersListProps {
	members: IBoardMember[]
	membersPending?: boolean
	boardId: string
}

export interface BoardMemberItemProps {
	member: IBoardMember
	isDeleteOpen: boolean
	joinedAtText: string
	canRemove: boolean
	canManageRoles: boolean
	isLoading?: boolean
	changeRolePending?: boolean
	t: ReturnType<typeof useTranslations>
	setIsDeleteOpen: (open: boolean) => void
	onRemove?: () => void
	changeRole: (value: BoardRole) => void
}

export interface BoardDragOverlayProps {
	activeColumn: IColumn | null
	activeCard: ICard | null
	boardId: string
}

export interface BoardUpdateMemberRoleRequest {
	userId: string
	role: BoardRole
}

export interface BoardFavoriteButtonProps {
	boardId: string
	isFavorite?: boolean
	isBoardPage?: boolean
	buttonClassname?: string
}

export interface BoardSidebarItem {
	icon?: React.ReactNode
	label: string
	value: SettingsTab
}
