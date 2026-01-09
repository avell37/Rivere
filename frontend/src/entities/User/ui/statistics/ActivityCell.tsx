import { format, parseISO } from 'date-fns'

import { getActivityColor } from '@/shared/libs/getActivityColor'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/shared/ui/external'

interface ActivityCellProps {
	date: string
	value: number
}

export const ActivityCell = ({ date, value }: ActivityCellProps) => {
	return (
		<TooltipProvider delayDuration={100}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className={`w-4 h-4 rounded-sm duration-200 transition-colors border p-2 ${getActivityColor(value)}`}
					/>
				</TooltipTrigger>
				<TooltipContent
					side='top'
					className='flex flex-col gap-1 text-xs'
				>
					<span>{format(parseISO(date), 'dd.MM.yyyy')}</span>
					<span>Закрыто карточек: {value}</span>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
