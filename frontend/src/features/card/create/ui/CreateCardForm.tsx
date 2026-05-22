'use client'
import { useTranslations } from 'next-intl'

import { getPrioritySelectOptions } from '@/shared/config'
import {
	FormDatePickerController,
	FormInputController,
	FormSelectController,
	FormTextareaController,
	FormWrapper
} from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { CreateCardFormProps } from '../model/types/CreateCardProps'

export const CreateCardForm = ({
	form,
	onSubmit,
	isPending,
	t
}: CreateCardFormProps) => {
	const tPriority = useTranslations('priority')

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('createModalSubmit')}
				closeText={t('createModalClose')}
				isPending={isPending}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='title'
						label={t('createTitleModalLabel')}
						placeholder={t('createTitleModalPlaceholder')}
						control={form.control}
						disabled={isPending}
					/>
					<FormTextareaController
						name='description'
						label={t('createDescriptionModalLabel')}
						placeholder={t('createDescriptionModalPlaceholder')}
						control={form.control}
						disabled={isPending}
					/>
					<div className='flex flex-col sm:flex-row gap-2'>
						<FormSelectController
							name='priority'
							label={t('createPriorityModalLabel')}
							placeholder={t('createPriorityModalPlaceholder')}
							className='w-48'
							control={form.control}
							options={getPrioritySelectOptions(tPriority)}
							disabled={isPending}
						/>
						<FormDatePickerController
							name='deadline'
							label={t('createDeadlineModalLabel')}
							placeholder={t('createDeadlineModalPlaceholder')}
							control={form.control}
							disabled={isPending}
						/>
					</div>
				</div>
			</FormWrapper>
		</Form>
	)
}
