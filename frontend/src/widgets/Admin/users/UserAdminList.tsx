'use client'

import { useTranslations } from 'next-intl'

import { AdminUsersFilters, UsersResponse } from '@/features/admin'
import { buildAdminUsersQuery } from '@/features/admin/users/model/lib/admin-users-query'

import { CustomPagination } from '@/shared/ui/custom'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/shared/ui/external'

import { UserAdminItem } from './UserAdminItem'

export const UserAdminList = ({
	data,
	filters
}: {
	data: UsersResponse
	filters: AdminUsersFilters
}) => {
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
								{t('status')}
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
						{data.users.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className='p-6 text-center text-sm text-muted-foreground'
								>
									{t('empty')}
								</TableCell>
							</TableRow>
						) : (
							data.users.map(user => (
								<UserAdminItem key={user.id} user={user} />
							))
						)}
					</TableBody>
				</Table>
			</div>
			<CustomPagination
				page={data.page}
				totalPages={data.totalPages}
				buildPageHref={page =>
					`?${buildAdminUsersQuery({ ...filters, page })}`
				}
			/>
		</div>
	)
}
