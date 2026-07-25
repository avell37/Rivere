'use client'

import { useSearchParams } from 'next/navigation'

import {
	UserAdminFilters,
	UserAdminListSkeleton,
	parseAdminUsersFilters,
	useGetAllUsers
} from '@/features/admin'

import { AdminPageShell } from '../ui/AdminPageShell'

import { UserAdminList } from './UserAdminList'

export const Users = () => {
	const searchParams = useSearchParams()
	const filters = parseAdminUsersFilters(searchParams)
	const { data, isLoading } = useGetAllUsers(filters)

	return (
		<AdminPageShell
			isLoading={isLoading || !data}
			loadingFallback={<UserAdminListSkeleton />}
			beforeContent={<UserAdminFilters filters={filters} />}
		>
			<UserAdminList data={data!} filters={filters} />
		</AdminPageShell>
	)
}
