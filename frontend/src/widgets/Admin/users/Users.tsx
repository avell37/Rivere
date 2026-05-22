'use client'
import { useSearchParams } from 'next/navigation'

import { UserAdminListSkeleton, useGetAllUsers } from '@/features/admin'

import { NavBar } from '@/shared/ui/custom'

import { UserAdminList } from './UserAdminList'

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
