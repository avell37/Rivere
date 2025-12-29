import { Alert } from '@/shared/ui/custom'
import { Button, Separator } from '@/shared/ui/external'

import { useSession } from '../model/hooks/useSession'
import { ISession } from '../model/types/ISession'

import { SessionList } from './SessionList'

export const Sessions = () => {
	const { userSessions, terminateAllSessions } = useSession()

	const hasOtherSessions = userSessions?.some(
		(session: ISession) => !session.isCurrent
	)

	return (
		<div className='flex flex-col gap-6 w-full'>
			<Separator />
			<div className='flex justify-between'>
				<h3 className='text-2xl font-bold'>Сессии</h3>
				{hasOtherSessions && (
					<Alert
						trigger={<Button>Завершить все, кроме текущей</Button>}
						title='Вы уверены?'
						description='Все сессии, кроме текущей безвозвратно завершатся.'
						actionText='Завершить'
						cancelText='Отменить'
						onSubmit={terminateAllSessions}
					/>
				)}
			</div>
			<Separator />
			<div className='border rounded-md p-4 flex flex-col gap-8'>
				<SessionList />
			</div>
		</div>
	)
}
