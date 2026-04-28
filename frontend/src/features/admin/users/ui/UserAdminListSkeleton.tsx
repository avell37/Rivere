import { UserAdminItemSkeleton } from './UserAdminItemSkeleton'

export const UserAdminListSkeleton = () => {
	return (
		<div className='flex flex-col gap-4 border rounded-xl p-2'>
			{Array.from({ length: 10 }).map((el, idx) => (
				<UserAdminItemSkeleton key={idx} />
			))}
		</div>
	)
}
