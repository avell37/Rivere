import { MoreHorizontal } from 'lucide-react'

import { UserAvatar } from '@/entities/User'

import { Alert, AppDropdown, DropdownActionItem } from '@/shared/ui/custom'
import {
	Badge,
	Button,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger
} from '@/shared/ui/external'
import { BoardRole, cn } from '@/shared/utils'

import { BoardMemberItemProps } from '../model/types/BoardProps'

export const BoardMemberItem = ({
	member,
	isDeleteOpen,
	joinedAtText,
	changeRolePending,
	canRemove,
	canManageRoles,
	t,
	onRemove,
	changeRole,
	setIsDeleteOpen
}: BoardMemberItemProps) => {
	const hasActions = canManageRoles || canRemove

	return (
		<div
			className={cn(
				'relative flex justify-between items-center gap-3 rounded-lg border p-4 shadow-sm',
				changeRolePending && 'opacity-60 transition-opacity'
			)}
		>
			<div className='flex items-center gap-3'>
				<UserAvatar
					avatarClassname='h-10 w-10 rounded-full'
					avatar={member?.user?.avatar}
					username={member?.user?.nickname}
				/>
				<div className='flex flex-col gap-1 min-w-0'>
					<div className='flex gap-2'>
						<div className='truncate font-medium'>
							{member?.user?.nickname}
						</div>
						<Badge variant='outline'>
							{t(`roles.${member.role}`)}
						</Badge>
					</div>
					<span className='text-[10px] text-muted-foreground'>
						{joinedAtText}
					</span>
				</div>
			</div>

			{hasActions && (
				<AppDropdown
					trigger={
						<Button variant='ghost' size='none'>
							<MoreHorizontal />
						</Button>
					}
				>
					{canManageRoles && (
						<>
							<DropdownMenuLabel>
								{t('changeRole.heading')}
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									{t('changeRole.title')}
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									{member.role !== 'ADMIN' && (
										<DropdownActionItem
											onClick={() =>
												changeRole(BoardRole.ADMIN)
											}
											disabled={changeRolePending}
										>
											{t('roles.ADMIN')}
										</DropdownActionItem>
									)}
									{member.role !== 'MEMBER' && (
										<DropdownActionItem
											onClick={() =>
												changeRole(BoardRole.MEMBER)
											}
											disabled={changeRolePending}
										>
											{t('roles.MEMBER')}
										</DropdownActionItem>
									)}
								</DropdownMenuSubContent>
							</DropdownMenuSub>
						</>
					)}
					{canRemove && (
						<DropdownActionItem
							onClick={() => setIsDeleteOpen(true)}
						>
							{t('changeRole.kick')}
						</DropdownActionItem>
					)}
				</AppDropdown>
			)}
			{isDeleteOpen && (
				<Alert
					open={isDeleteOpen}
					onOpenChange={setIsDeleteOpen}
					title={t('deleteMemberTitle', {
						name: member.user.nickname
					})}
					description={t('deleteMemberDescription')}
					actionText={t('deleteMemberActionText')}
					cancelText={t('deleteMemberCancelText')}
					onSubmit={onRemove}
				/>
			)}
		</div>
	)
}
