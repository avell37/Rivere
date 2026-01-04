'use client'
import { UseFormReturn } from 'react-hook-form'

import { FormInputController } from '@/shared/ui/custom'
import { Button, DialogClose, DialogFooter } from '@/shared/ui/external'
import { Form } from '@/shared/ui/external/Form/Form'

interface CreateColumnFormProps {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
	t: (key: string) => string
}

export const CreateColumnForm = ({
	form,
	onSubmit,
	t
}: CreateColumnFormProps) => {
	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormInputController
					name='title'
					label={t('createModalLabel')}
					placeholder={t('createModalPlaceholder')}
					control={form.control}
				/>
				<DialogFooter>
					<Button type='submit' variant='outline'>
						{t('createModalSubmit')}
					</Button>
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
