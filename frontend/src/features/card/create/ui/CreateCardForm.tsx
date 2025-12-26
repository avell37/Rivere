'use client'
import { UseFormReturn } from 'react-hook-form'

import {
	FormDatePickerController,
	FormInputController,
	FormSelectController,
	FormTextareaController,
	FormWrapper
} from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

interface CreateCardFormProps {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
}

export const CreateCardForm = ({ form, onSubmit }: CreateCardFormProps) => {
	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Добавить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='title'
						label='Название карточки'
						placeholder='Введите название новой карточки'
						control={form.control}
					/>
					<FormTextareaController
						name='description'
						placeholder='Опишите вашу карточку'
						control={form.control}
					/>
					<div className='flex gap-2'>
						<FormSelectController
							name='priority'
							label='Приоритет'
							control={form.control}
						/>
						<FormDatePickerController
							name='deadline'
							label='Дедлайн'
							control={form.control}
						/>
					</div>
				</div>
			</FormWrapper>
		</Form>
	)
}
