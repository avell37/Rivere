'use client'

import { useTranslations } from 'next-intl'

import { UsersResponse } from '@/features/admin/users/model/types/AdminUserTypes'

import { CustomPagination } from '@/shared/ui/custom/CustomPagination/CustomPagination'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/external'

import { UserAdminItem } from './UserAdminItem'

export const UserAdminList = ({ data }: { data: UsersResponse }) => {
	const t = useTranslations('admin.users.table')

	return (
		<div className='flex flex-col gap-4'>
			<div className='rounded-xl border bg-card'>
				<Table>
					<TableHeader>
						<TableRow className='rounded-xl'>
							<TableHead>{t('user')}</TableHead>
							<TableHead className='text-center'>
								{t('role')}
							</TableHead>
							<TableHead className='text-center'>
								{t('boards')}
							</TableHead>
							<TableHead className='text-center'>
								{t('cards')}
							</TableHead>
							<TableHead className='text-right'>
								{t('actions')}
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.users.map(user => (
							<UserAdminItem key={user.id} user={user} />
						))}
					</TableBody>
				</Table>
			</div>
			<CustomPagination page={data.page} totalPages={data.totalPages} />
		</div>
	)
}
