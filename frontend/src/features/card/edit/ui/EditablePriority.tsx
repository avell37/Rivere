import { useForm } from 'react-hook-form'

import { Priority } from '@/entities/Card/model/types/CardPriority'

import { FormSelectController } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useUpdateCard } from '../model/hooks/useUpdateCard'

interface EditablePriorityProps {
	cardId: string
	initialValue: Priority
}

export const EditablePriority = ({
	cardId,
	initialValue
}: EditablePriorityProps) => {
	// const { update } = useUpdateCard(cardId)
	// return (
	// 	<Form {...form}>
	// 		<FormSelectController
	// 			name='priority'
	// 			label='Приоритет'
	// 			control={form.control}
	// 			onChange={value => update({ priority: value })}
	// 		/>
	// 	</Form>
	// )
}
