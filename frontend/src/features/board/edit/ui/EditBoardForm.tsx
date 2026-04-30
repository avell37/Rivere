'use client'
import { useWatch } from 'react-hook-form'

import {
	BackgroundPicker,
	BackgroundPreview,
	FormInputController
} from '@/shared/ui/custom'
import { Button, DialogClose, DialogFooter, Form } from '@/shared/ui/external'

import { EditBoardFormProps } from '../model/types/EditBoardProps'

export const EditBoardForm = ({ form, onSubmit, t }: EditBoardFormProps) => {
	const background = useWatch({
		control: form.control,
		name: 'background'
	})

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-6'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<BackgroundPreview background={background} />

				<FormInputController
					name='title'
					control={form.control}
					label={t('editModalLabel')}
					placeholder={t('editModalPlaceholder')}
				/>

				<BackgroundPicker control={form.control} />

				<DialogFooter>
					<Button type='submit'>{t('editModalSubmit')}</Button>
					<DialogClose asChild>
						<Button variant='outline'>{t('editModalClose')}</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	)
}
