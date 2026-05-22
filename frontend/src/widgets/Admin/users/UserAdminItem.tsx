'use client'

import { Ellipsis, UserRoundPlus, UserRoundX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { IAdminUser, useGetUser } from '@/entities/User'

import {
	UserAdminBanForm,
	UserAdminCard,
	useBanUser,
	useSetUserRole,
	useUnbanUser
} from '@/features/admin'

import { customAvatar } from '@/shared/config'
import { S3_URL } from '@/shared/libs'
import { AppDropdown, Modal } from '@/shared/ui/custom'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	DropdownMenuItem,
	TableCell,
	TableRow
} from '@/shared/ui/external'
import { isUserBanned, roleStyles } from '@/shared/utils'

export const UserAdminItem = ({ user }: { user: IAdminUser }) => {
	const [open, setOpen] = useState(false)
	const t = useTranslations('admin.users.banModal')

	const { data: currentUser } = useGetUser()
	const { form, banPending, onSubmit } = useBanUser(user.id)
	const { removeBan, unbanPending } = useUnbanUser(user.id)
	const { changeRole, isPending: rolePending } = useSetUserRole(user.id)

	const isBanned = isUserBanned(user)

	return (
		<>
			<TableRow
				className='cursor-pointer hover:bg-muted/40 transition'
				onClick={() => setOpen(true)}
			>
				<TableCell>
					<div className='flex items-center gap-3 min-w-0'>
						<Avatar className='w-12 h-12'>
							{user.avatar ? (
								<AvatarImage src={`${S3_URL}${user.avatar}`} />
							) : (
								<AvatarFallback>
									{customAvatar(user.username)}
								</AvatarFallback>
							)}
						</Avatar>
						<div className='min-w-0'>
							<p className='font-medium truncate'>
								{user.username}
							</p>
							<p className='text-xs text-muted-foreground truncate'>
								{user.email}
							</p>
						</div>
					</div>
				</TableCell>
				<TableCell className='text-center'>
					<Badge
						variant='secondary'
						className={roleStyles[user.role]}
					>
						{user.role}
					</Badge>
				</TableCell>
				<TableCell className='text-center'>
					{user._count?.boards || 0}
				</TableCell>
				<TableCell className='text-center'>
					{user.userStats?.totalCompletedCards ?? 0}
				</TableCell>
				{user.role !== 'ADMIN' && user.role !== 'CREATOR' ? (
					<TableCell
						className='text-right'
						onClick={e => e.stopPropagation()}
					>
						<AppDropdown
							trigger={
								<Button variant='ghost' size='icon'>
									<Ellipsis size={16} />
								</Button>
							}
						>
							<DropdownMenuItem asChild>
								{isBanned ? (
									<Button
										variant='ghost'
										onClick={() => removeBan()}
										disabled={unbanPending}
										className='w-full justify-start'
									>
										<UserRoundPlus size={14} />
										{unbanPending
											? t('unbanPending')
											: t('unban')}
									</Button>
								) : (
									<Modal
										trigger={
											<div className='flex items-center gap-2 text-sm p-2 cursor-pointer hover:bg-muted/50 transition rounded'>
												<UserRoundX size={14} />
												{t('ban')}
											</div>
										}
										title={t('heading', {
											nickname: user.username
										})}
										contentClassname='max-w-md'
									>
										<UserAdminBanForm
											form={form}
											t={t}
											onSubmit={onSubmit}
											banPending={banPending}
										/>
									</Modal>
								)}
							</DropdownMenuItem>
						</AppDropdown>
					</TableCell>
				) : null}
			</TableRow>
			{currentUser && (
				<Modal
					open={open}
					onOpenChange={setOpen}
					contentClassname='max-w-xl'
				>
					<UserAdminCard
						currentUser={currentUser}
						user={user}
						changeRole={changeRole}
						rolePending={rolePending}
					/>
				</Modal>
			)}
		</>
	)
}
