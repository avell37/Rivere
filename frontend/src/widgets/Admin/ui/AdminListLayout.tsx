'use client'

import { ReactNode } from 'react'

import { CustomPagination, EmptyState } from '@/shared/ui/custom'

type AdminListLayoutProps = {
	heading: string
	filter?: ReactNode
	isEmpty: boolean
	emptyText: string
	page: number
	totalPages: number
	buildPageHref: (page: number) => string
	children: ReactNode
}

export const AdminListLayout = ({
	heading,
	filter,
	isEmpty,
	emptyText,
	page,
	totalPages,
	buildPageHref,
	children
}: AdminListLayoutProps) => (
	<div className='flex flex-col gap-4'>
		<div className='flex items-center justify-between gap-3'>
			<h1 className='text-xl font-semibold'>{heading}</h1>
			{filter}
		</div>

		<div className='flex flex-col gap-3'>
			{isEmpty ? (
				<EmptyState centered>{emptyText}</EmptyState>
			) : (
				children
			)}
		</div>

		<CustomPagination
			page={page}
			totalPages={totalPages}
			buildPageHref={buildPageHref}
		/>
	</div>
)
