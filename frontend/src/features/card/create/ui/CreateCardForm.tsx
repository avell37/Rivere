'use client'
import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'

import { getPrioritySelectOptions } from '@/shared/libs/priorityConfig'
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
	t: (key: string) => string
}

export const CreateCardForm = ({ form, onSubmit, t }: CreateCardFormProps) => {
	const tPriority = useTranslations('priority')

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('createModalSubmit')}
				closeText={t('createModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='title'
						label={t('createTitleModalLabel')}
						placeholder={t('createTitleModalPlaceholder')}
						control={form.control}
					/>
					<FormTextareaController
						name='description'
						placeholder={t('createDescriptionModalPlaceholder')}
						control={form.control}
					/>
					<div className='flex gap-2'>
						<FormSelectController
							name='priority'
							label={t('createPriorityModalLabel')}
							placeholder={t('createPriorityModalPlaceholder')}
							control={form.control}
							options={getPrioritySelectOptions(tPriority)}
						/>
						<FormDatePickerController
							name='deadline'
							label={t('createDeadlineModalLabel')}
							placeholder={t('createDeadlineModalPlaceholder')}
							control={form.control}
						/>
					</div>
				</div>
			</FormWrapper>
		</Form>
	)
}
