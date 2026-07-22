'use client'
import { useSearchParams } from 'next/navigation'

import {
	UserAdminFilters,
	UserAdminListSkeleton,
	parseAdminUsersFilters,
	useGetAllUsers
} from '@/features/admin'

import { NavBar } from '@/shared/ui/custom'

import { UserAdminList } from './UserAdminList'

export const Users = () => {
	const searchParams = useSearchParams()
	const filters = parseAdminUsersFilters(searchParams)
	const { data, isLoading } = useGetAllUsers(filters)

	if (isLoading || !data) {
		return (
			<div className='container mx-auto flex flex-col gap-6 pb-10'>
				<NavBar />
				<UserAdminFilters filters={filters} />
				<UserAdminListSkeleton />
			</div>
		)
	}

	return (
		<div className='container mx-auto flex flex-col gap-6 pb-10'>
			<NavBar />
			<UserAdminFilters filters={filters} />
			<UserAdminList data={data} filters={filters} />
		</div>
	)
}
