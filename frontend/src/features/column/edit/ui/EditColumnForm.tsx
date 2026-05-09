'use client'
import { FormInputController } from '@/shared/ui/custom'
import {
	Button,
	DialogClose,
	DialogFooter,
	Form,
	Spinner
} from '@/shared/ui/external'

import { EditColumnFormProps } from '../model/types/EditColumnProps'

export const EditColumnForm = ({
	form,
	isPending,
	onSubmit,
	t
}: EditColumnFormProps) => {
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
					disabled={isPending}
				/>
				<DialogFooter>
					<Button
						variant='outline'
						type='submit'
						className='relative flex justify-center items-center rounded-md'
						disabled={isPending}
					>
						<span className={isPending ? 'invisible' : 'visible'}>
							{t('editModalSubmit')}
						</span>

						{isPending && (
							<div className='absolute inset-0 flex items-center justify-center'>
								<Spinner />
							</div>
						)}
					</Button>

					<DialogClose asChild>
						<Button
							type='button'
							variant='outline'
							disabled={isPending}
						>
							{t('editModalClose')}
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	)
}
