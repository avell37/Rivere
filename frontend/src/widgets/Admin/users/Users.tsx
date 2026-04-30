'use client'
import { useSearchParams } from 'next/navigation'

import { useGetAllUsers } from '@/features/admin/users/model/hooks/useAdminQueries'
import { UserAdminListSkeleton } from '@/features/admin/users/ui/UserAdminListSkeleton'

import { NavBar } from '@/shared/ui/custom/NavBar/NavBar'

import { UserAdminList } from '@/widgets/Admin/users/UserAdminList'

export const Users = () => {
	const searchParams = useSearchParams()
	const page = Number(searchParams.get('page')) || 1
	const { data, isLoading } = useGetAllUsers(page)

	if (isLoading || !data) {
		return (
			<div className='container mx-auto flex flex-col gap-6 pb-10'>
				<NavBar />
				<UserAdminListSkeleton />
			</div>
		)
	}

	return (
		<div className='container mx-auto flex flex-col gap-6 pb-10'>
			<NavBar />
			<UserAdminList data={data} />
		</div>
	)
}
