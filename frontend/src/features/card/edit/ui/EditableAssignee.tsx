'use client'
import { UserCheck, UserX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import { useGetAllBoardMembers } from '@/entities/Board'

import { S3_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	PopoverContent,
	PopoverMain,
	PopoverTrigger
} from '@/shared/ui/external'
import { cn } from '@/shared/utils'

import { useUpdateCard } from '../model/hooks/useUpdateCard'

interface EditableAssigneeProps {
	cardId: string
	boardId: string
	t: (key: string) => string
}

export const EditableAssignee = ({
	cardId,
	boardId,
	t
}: EditableAssigneeProps) => {
	const tGlobal = useTranslations()
	const { watch, setValue } = useFormContext()
	const assigneeId: string | null = watch('assigneeId') ?? null

	const { handleChange, isLoading } = useUpdateCard(cardId, 'assigneeId')
	const { boardMembers, membersPending } = useGetAllBoardMembers(boardId)

	const currentAssignee = boardMembers.find(m => m.userId === assigneeId)

	const handleSelect = (userId: string) => {
		const next = assigneeId === userId ? null : userId
		setValue('assigneeId', next)
		handleChange(next)
	}

	const handleClear = () => {
		setValue('assigneeId', null)
		handleChange(null)
	}

	return (
		<div className='flex flex-col gap-1.5'>
			<span className='text-xs text-muted-foreground'>
				{t('editAssigneeLabel')}
			</span>
			<div className='flex items-center gap-2'>
				<PopoverMain>
					<PopoverTrigger asChild>
						<Button
							type='button'
							variant='none'
							size='none'
							disabled={isLoading || membersPending}
							className={cn(
								'flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-colors',
								'border-input hover:bg-accent hover:text-accent-foreground',
								isLoading && 'opacity-50 pointer-events-none'
							)}
						>
							{currentAssignee ? (
								<>
									<Avatar className='size-5 rounded-full'>
										<AvatarImage
											src={`${S3_URL}${currentAssignee.user.avatar}`}
											alt={currentAssignee.user.nickname}
										/>
										<AvatarFallback className='text-[10px]'>
											{currentAssignee.user.nickname
												.slice(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className='text-xs'>
										{currentAssignee.user.nickname}
									</span>
								</>
							) : (
								<>
									<UserCheck className='size-3.5 text-muted-foreground' />
									<span className='text-xs text-muted-foreground'>
										{t('editAssigneePlaceholder')}
									</span>
								</>
							)}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-56 p-1' align='start'>
						<div className='flex flex-col gap-0.5'>
							{boardMembers.map(member => (
								<Button
									key={member.userId}
									type='button'
									variant='none'
									size='none'
									onClick={() => handleSelect(member.userId)}
									className={cn(
										'flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors w-full text-left',
										'hover:bg-accent',
										assigneeId === member.userId &&
											'bg-accent'
									)}
								>
									<Avatar className='size-6 rounded-full flex-shrink-0'>
										<AvatarImage
											src={`${S3_URL}${member.user.avatar}`}
											alt={member.user.nickname}
										/>
										<AvatarFallback className='text-[10px]'>
											{member.user.nickname
												.slice(0, 2)
												.toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className='text-xs truncate'>
										{member.user.nickname}
									</span>
									{assigneeId === member.userId && (
										<UserCheck className='ml-auto size-3.5 text-primary flex-shrink-0' />
									)}
								</Button>
							))}
							{boardMembers.length === 0 && (
								<p className='px-2 py-1.5 text-xs text-muted-foreground'>
									{tGlobal('board.filters.noMembers')}
								</p>
							)}
						</div>
					</PopoverContent>
				</PopoverMain>

				{assigneeId && (
					<Button
						type='button'
						variant='none'
						size='none'
						onClick={handleClear}
						disabled={isLoading}
						className='text-muted-foreground hover:text-foreground'
					>
						<UserX className='size-4' />
					</Button>
				)}
			</div>
		</div>
	)
}
