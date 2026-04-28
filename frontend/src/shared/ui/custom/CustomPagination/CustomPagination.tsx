'use client'
import { useRouter } from 'next/navigation'

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '../../external'

export const CustomPagination = ({
	page,
	totalPages
}: {
	page: number
	totalPages: number
}) => {
	const router = useRouter()

	const handlePageChange = (newPage: number) => {
		router.push(`?page=${newPage}`)
	}

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem
					className={
						page === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
					}
				>
					<PaginationPrevious
						onClick={() => handlePageChange(page - 1)}
						className={
							page === 1 ? 'pointer-events-none opacity-50' : ''
						}
					/>
				</PaginationItem>

				{Array.from({ length: totalPages }, (el, idx) => {
					const pageNumber = idx + 1

					return (
						<PaginationItem
							key={pageNumber}
							className='cursor-pointer'
						>
							<PaginationLink
								isActive={page === pageNumber}
								onClick={() => handlePageChange(pageNumber)}
							>
								{pageNumber}
							</PaginationLink>
						</PaginationItem>
					)
				})}

				<PaginationItem
					className={
						page === totalPages
							? 'cursor-not-allowed'
							: 'cursor-pointer'
					}
				>
					<PaginationNext
						className={
							page === totalPages
								? 'pointer-events-none opacity-50'
								: ''
						}
						onClick={() => handlePageChange(page + 1)}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	)
}
