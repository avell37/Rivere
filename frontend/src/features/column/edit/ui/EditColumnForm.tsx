'use client'
import { UseFormReturn } from 'react-hook-form'

import { FormInputController } from '@/shared/ui/custom'
import { Button, DialogClose, DialogFooter, Input } from '@/shared/ui/external'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/external/Form/Form'

interface CreateColumnFormProps {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
	t: (key: string) => string
}

export const EditColumnForm = ({
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
					label={t('editModalLabel')}
					placeholder={t('editModalPlaceholder')}
					control={form.control}
				/>
				<DialogFooter>
					<Button type='submit' variant='outline'>
						{t('editModalSubmit')}
					</Button>
					<DialogClose asChild>
						<Button variant='outline'>{t('editModalClose')}</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	)
}
