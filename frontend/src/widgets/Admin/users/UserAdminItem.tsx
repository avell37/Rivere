'use client'

import { Ellipsis, UserRoundX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { IAdminUser, useGetUser } from '@/entities/User'

import {
	useSetUserRole,
	useUnbanUser
} from '@/features/admin/users/model/hooks/useAdminQueries'
import { useBanUser } from '@/features/admin/users/model/hooks/useBanUser'
import { UserAdminBanCard } from '@/features/admin/users/ui/UserAdminBanCard'
import { UserAdminCard } from '@/features/admin/users/ui/UserAdminCard'

import { customAvatar } from '@/shared/config'
import { S3_URL } from '@/shared/libs'
import { Modal } from '@/shared/ui/custom'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	TableCell,
	TableRow
} from '@/shared/ui/external'
import { roleStyles } from '@/shared/utils'

export const UserAdminItem = ({ user }: { user: IAdminUser }) => {
	const [open, setOpen] = useState(false)
	const t = useTranslations('admin.users.banModal')

	const { data: currentUser } = useGetUser()
	const { form, onSubmit } = useBanUser(user.id)
	const { removeBan } = useUnbanUser(user.id)
	const { changeRole, isPending: rolePending } = useSetUserRole(user.id)

	const isBanned =
		user.bannedUntil && new Date(user.bannedUntil).getTime() > Date.now()

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
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant='ghost' size='icon'>
									<Ellipsis size={16} />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align='end'>
								<DropdownMenuItem asChild>
									{isBanned ? (
										<div onClick={() => removeBan()}>
											Разбанить
										</div>
									) : (
										<Modal
											trigger={
												<div className='flex items-center gap-2 text-sm p-2 cursor-pointer hover:bg-muted/50 transition rounded'>
													<UserRoundX size={14} />
													{t('trigger')}
												</div>
											}
											title={t('heading', {
												nickname: user.username
											})}
											contentClassname='max-w-xl'
										>
											<UserAdminBanCard
												form={form}
												t={t}
												onSubmit={onSubmit}
											/>
										</Modal>
									)}
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
