'use client'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { useLeaveBoard } from '../model/hooks/useBoardMembersQueries'

import { PRIVATE_URL } from '@/shared/libs'
import { Alert } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'
import { BoardRole } from '@/shared/utils'

interface LeaveBoardButtonProps {
	boardId: string
	currentUserRole?: BoardRole
}

export const LeaveBoardButton = ({
	boardId,
	currentUserRole
}: LeaveBoardButtonProps) => {
	const t = useTranslations('board.membersList.leave')
	const router = useRouter()
	const [open, setOpen] = useState(false)
	const { leaveBoard, leaveBoardPending } = useLeaveBoard(boardId)

	if (!currentUserRole || currentUserRole === BoardRole.OWNER) {
		return null
	}

	const handleLeave = () => {
		leaveBoard(undefined, {
			onSuccess: () => {
				setOpen(false)
				router.push(PRIVATE_URL.boards())
			}
		})
	}

	return (
		<>
			<div className='mt-6 rounded-lg border border-destructive/30 p-4'>
				<h3 className='font-medium text-sm mb-1'>{t('title')}</h3>
				<p className='text-xs text-muted-foreground mb-3'>
					{t('description')}
				</p>
				<Button
					type='button'
					variant='destructive'
					size='sm'
					onClick={() => setOpen(true)}
					disabled={leaveBoardPending}
				>
					<LogOut className='size-4' />
					{t('action')}
				</Button>
			</div>

			<Alert
				open={open}
				onOpenChange={setOpen}
				title={t('confirmTitle')}
				description={t('confirmDescription')}
				actionText={t('action')}
				cancelText={t('cancel')}
				onSubmit={handleLeave}
			/>
		</>
	)
}
