'use client'
import { FormInputController } from '@/shared/ui/custom'
import { Button, DialogClose, DialogFooter, Form } from '@/shared/ui/external'

import { EditColumnFormProps } from '../model/types/EditColumnProps'

export const EditColumnForm = ({ form, onSubmit, t }: EditColumnFormProps) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormInputController
					name='title'
					label={t('editModalLabel')}
					placeholder={t('editModalPlaceholder')}
					control={form.control}
				/>
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
