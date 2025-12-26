import { Link, Settings, Users } from 'lucide-react'

import { Button } from '@/shared/ui/external'

export const BoardHeaderActions = () => {
	return (
		<div className='flex items-center gap-2 '>
			<Button
				type='button'
				variant='none'
				size='none'
				className='p-2 rounded-md hover:bg-zinc-700 transition'
			>
				<Link size={18} />
			</Button>
			<Button
				type='button'
				variant='none'
				size='none'
				className='p-2 rounded-md hover:bg-zinc-700 transition'
			>
				<Users size={18} />
			</Button>
			<Button
				type='button'
				variant='none'
				size='none'
				className='p-2 rounded-md hover:bg-zinc-700 transition'
			>
				<Settings size={18} />
			</Button>
		</div>
	)
}
