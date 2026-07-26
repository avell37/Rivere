'use client'

import {
	Calendar,
	Clock,
	LayoutDashboard,
	Mail,
	Shield,
	TrendingUp,
	User2,
	UserX,
	Users
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'

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
	SelectValue,
	Separator
} from '@/shared/ui/external'
import { formatDateTime, isUserBanned } from '@/shared/utils'

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
	const locale = useLocale()

	if (!user) return null

	const isBanned = isUserBanned(user)

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
			<Separator />
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
					<p>{user.isEmailVerified ? t('yes') : t('no')}</p>
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
			<Separator />
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
			<Separator />
			<div className='text-sm'>
				<p className='mb-2 font-semibold flex items-center gap-2'>
					<UserX size={16} />
					{t('banStatus.title')}
				</p>
				<div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
					<div>
						<span className='text-muted-foreground'>
							{t('banStatus.status')}
						</span>
						<p>
							{isBanned
								? t('banStatus.banned')
								: t('banStatus.active')}
						</p>
					</div>
					{isBanned && user.bannedUntil && (
						<div>
							<span className='text-muted-foreground'>
								{t('banStatus.until')}
							</span>
							<p>{formatDateTime(user.bannedUntil, locale)}</p>
						</div>
					)}
					{user.banReason && (
						<div className='sm:col-span-2'>
							<span className='text-muted-foreground'>
								{t('banStatus.reason')}
							</span>
							<p>{user.banReason}</p>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
