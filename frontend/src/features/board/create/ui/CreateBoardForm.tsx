'use client'
import { UseFormReturn } from 'react-hook-form'

import { FormInputController } from '@/shared/ui/custom'
import { BackgroundPicker } from '@/shared/ui/custom/BoardBackgroundChanger/BackgroundPicker'
import { BackgroundPreview } from '@/shared/ui/custom/BoardBackgroundChanger/BackgroundPreview'
import { Button, DialogClose, DialogFooter, Input } from '@/shared/ui/external'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/external/Form/Form'

interface CreateBoardFormProps {
	form: UseFormReturn<any>
	onSubmit: (data: any) => void
}

export const CreateBoardForm = ({ form, onSubmit }: CreateBoardFormProps) => {
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
					label='Название'
					placeholder='Название доски'
					control={form.control}
				/>
				<BackgroundPicker control={form.control} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant='outline'>Закрыть</Button>
					</DialogClose>

					<Button type='submit' variant='outline'>
						Сохранить
					</Button>
				</DialogFooter>
			</form>
		</Form>
	)
}
