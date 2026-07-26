'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { toast } from 'sonner'

import { InviteSearchUser } from '../types/InviteProps'

import { useInviteUser } from './useInviteQueries'

export const useInviteSearch = (boardId: string) => {
	const t = useTranslations('invite.user')
	const [query, setQuery] = useState('')
	const [debouncedQuery, setDebouncedQuery] = useState('')
	const { inviteUserToBoard, inviteUserPending } = useInviteUser()

	const handleSearch = () => {
		setDebouncedQuery(query.trim())
	}

	const handleInvite = async (user: InviteSearchUser) => {
		await inviteUserToBoard(
			{ boardId, userId: user.id },
			{
				onSuccess: () => {
					toast.success(t('invited', { name: user.nickname }))
				}
			}
		)
	}

	return {
		t,
		query,
		debouncedQuery,
		inviteUserPending,
		setQuery,
		handleSearch,
		handleInvite
	}
}
