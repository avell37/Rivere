'use client'
import { FormInputController } from '@/shared/ui/custom'
import {
	Button,
	DialogClose,
	DialogFooter,
	Form,
	Spinner
} from '@/shared/ui/external'

import { CreateColumnFormProps } from '../model/types/CreateColumnProps'

export const CreateColumnForm = ({
	form,
	isPending,
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
							{t('createModalSubmit')}
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
							{t('createModalClose')}
						</Button>
					</DialogClose>
				</DialogFooter>
			</form>
		</Form>
	)
}
