'use client'

import {
	Calendar,
	Clock,
	LayoutDashboard,
	Mail,
	Shield,
	TrendingUp,
	User2,
	Users
} from 'lucide-react'
import { useTranslations } from 'next-intl'

import { IAdminUser, IUser, UserRole } from '@/entities/User'

import { customAvatar } from '@/shared/config'
import { S3_URL } from '@/shared/libs'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/shared/ui/external'

export const UserAdminCard = ({
	currentUser,
	user,
	rolePending,
	changeRole
}: {
	currentUser: IUser
	user: IAdminUser
	rolePending: boolean
	changeRole: (role: string) => void
}) => {
	const t = useTranslations('admin.users.card')

	if (!user) return null

	const handleChangeRole = (role: UserRole) => {
		changeRole(role)
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-4'>
					<Avatar className='w-20 h-20 rounded-md'>
						{user?.avatar ? (
							<AvatarImage
								src={`${S3_URL}${user.avatar}`}
								alt={user.username}
							/>
						) : (
							<AvatarFallback>
								{customAvatar(user.username || '')}
							</AvatarFallback>
						)}
					</Avatar>
					<div>
						<h2 className='flex items-center gap-2 text-lg font-semibold'>
							<User2 size={18} />
							{user.username}
						</h2>
						<p className='flex items-center gap-2 text-sm text-muted-foreground'>
							<Mail size={18} />
							{user.email}
						</p>
					</div>
				</div>
				{currentUser.role === 'CREATOR' && user.role !== 'CREATOR' && (
					<div className='flex flex-col gap-1'>
						<Label className='text-xs text-muted-foreground'>
							{t('changeRole')}
						</Label>
						<Select
							disabled={rolePending}
							defaultValue={user.role}
							onValueChange={role =>
								handleChangeRole(role as UserRole)
							}
						>
							<SelectTrigger className='w-[140px]'>
								<SelectValue placeholder={t('roles.select')} />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='USER'>
									{t('roles.USER')}
								</SelectItem>
								<SelectItem value='ADMIN'>
									{t('roles.ADMIN')}
								</SelectItem>
							</SelectContent>
						</Select>
					</div>
				)}
			</div>
			<div className='grid grid-cols-2 gap-3 text-sm'>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<User2 size={14} />
						{t('nickname')}
					</span>
					<p>{user.nickname || '-'}</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<Shield size={14} />
						{t('role')}
					</span>
					<p>{user.role}</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<LayoutDashboard size={14} />
						{t('boards')}
					</span>
					<p>{user?._count?.boards || 0}</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<Mail size={14} />
						{t('emailVerified')}
					</span>
					<p>{user.isEmailVerified ? 'Yes' : 'No'}</p>
				</div>
				<div className='flex gap-4 text-sm'>
					<p>
						<span className='text-muted-foreground flex items-center gap-1'>
							<Calendar size={14} />
							{t('created')}
						</span>{' '}
						{new Date(user.createdAt).toLocaleDateString()}
					</p>
				</div>
				<div>
					{user.updatedAt && (
						<p>
							<span className='text-muted-foreground flex items-center gap-1'>
								<Clock size={14} />
								{t('updated')}
							</span>{' '}
							{new Date(user.updatedAt).toLocaleDateString()}
						</p>
					)}
				</div>
			</div>
			<div className='font-bold'>{t('statistics')}</div>
			<div className='grid grid-cols-2 gap-3 text-sm'>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<TrendingUp size={14} />
						{t('currentStreak')}
					</span>
					<p>{user?.userStats?.currentStreakDays || '-'}</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<TrendingUp size={14} />
						{t('longestStreak')}
					</span>
					<p>{user?.userStats?.longestStreakDays || '-'}</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<Clock size={14} />
						{t('lastActive')}
					</span>
					<p>
						{new Date(
							user?.userStats?.lastActiveDate
						).toLocaleDateString() || t('unknown')}
					</p>
				</div>
				<div>
					<span className='text-muted-foreground flex items-center gap-1'>
						<Users size={14} />
						{t('usersInvited')}
					</span>
					<p>{user?.userStats?.usersInvited || 0}</p>
				</div>
			</div>
		</div>
	)
}
