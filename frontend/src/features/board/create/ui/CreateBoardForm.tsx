'use client'
import {
	BackgroundPicker,
	BackgroundPreview,
	FormInputController
} from '@/shared/ui/custom'
import { Button, DialogClose, DialogFooter, Form } from '@/shared/ui/external'

import { CreateBoardFormProps } from '../model/types/CreateBoardProps'

export const CreateBoardForm = ({
	form,
	onSubmit,
	t
}: CreateBoardFormProps) => {
	const bg = form.watch('background')

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<BackgroundPreview background={bg} />
				<FormInputController
					name='title'
					label={t('createModalLabel')}
					placeholder={t('createModalPlaceholder')}
					control={form.control}
				/>
				<BackgroundPicker control={form.control} />
				<DialogFooter>
					<Button type='submit'>{t('createModalSubmit')}</Button>

					<DialogClose asChild>
						<Button variant='outline'>
							{t('createModalClose')}
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	)
}
