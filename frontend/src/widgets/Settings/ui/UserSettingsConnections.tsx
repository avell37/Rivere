'use client'

import { API_URL } from '@/shared/libs'
import { Badge, Button } from '@/shared/ui/external'

import { ConnectionsProps } from '../model/types/SettingsProps'

export const UserSettingsConnections = ({ t, user }: ConnectionsProps) => {
	const isYandexLinked = user.isYandexLinked

	const handleConnectYandex = () => {
		window.location.href = API_URL.socialAuth('yandex')
	}

	return (
		<div className='flex flex-col gap-4 sm:gap-6'>
			<h3 className='text-xl sm:text-2xl font-bold'>
				{t('connections.heading')}
			</h3>
			<div className='flex flex-col gap-4 sm:gap-6 rounded-lg border bg-sidebar p-4 sm:p-6 md:p-8'>
				<div
					className='flex w-full min-w-0 flex-col gap-4 rounded-lg
					transition-all hover:bg-accent/60 sm:flex-row sm:items-center sm:justify-between'
				>
					<div className='flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4'>
						<div
							className='flex size-11 shrink-0 items-center justify-center rounded-lg
							bg-[#FC3F1D] text-sm font-bold text-white'
						>
							Ya
						</div>
						<div className='flex min-w-0 flex-col gap-1'>
							<span className='font-medium'>
								{t('connections.yandex.name')}
							</span>
							<span className='text-pretty text-sm text-muted-foreground'>
								{t('connections.yandex.description')}
							</span>
						</div>
					</div>

					<div className='flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-3'>
						{isYandexLinked ? (
							<Badge
								variant='default'
								className='w-fit bg-green-500 py-0 text-white'
							>
								{t('connections.yandex.linked')}
							</Badge>
						) : (
							<>
								<Badge variant='secondary' className='w-fit'>
									{t('connections.yandex.notLinked')}
								</Badge>
								<Button
									type='button'
									variant='outline'
									className='w-full cursor-pointer sm:w-auto'
									onClick={handleConnectYandex}
								>
									{t('connections.yandex.connect')}
								</Button>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
