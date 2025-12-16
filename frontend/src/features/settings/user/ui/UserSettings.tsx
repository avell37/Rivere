'use client'
import { useGetUser } from '@/features/auth/model/hooks/useGetUser'

import { Input } from '@/shared/ui/external'

export const UserSettings = () => {
	const { data: user } = useGetUser()

	return (
		<div className='flex flex-col items-center justify-center px-6 py-4'>
			<h1 className='font-bold text-2xl'>Настройки:</h1>
			<div className='flex flex-col gap-6'>
				<Input className='' disabled value={user?.username || ''} />
				<Input
					className=''
					disabled
					value={user?.displayUsername || ''}
				/>
				<Input className='' disabled value={user?.email || ''} />
			</div>
		</div>
	)
}
