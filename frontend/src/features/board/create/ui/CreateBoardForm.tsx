'use client'
import {
	BackgroundPicker,
	BackgroundPreview,
	FormInputController
} from '@/shared/ui/custom'
import {
	Button,
	DialogClose,
	DialogFooter,
	Form,
	Spinner
} from '@/shared/ui/external'

import { CreateBoardFormProps } from '../model/types/CreateBoardProps'

export const CreateBoardForm = ({
	form,
	isPending,
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
					disabled={isPending}
					control={form.control}
				/>
				<BackgroundPicker
					control={form.control}
					isPending={isPending}
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
