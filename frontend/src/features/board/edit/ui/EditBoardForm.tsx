'use client'
import { useWatch } from 'react-hook-form'

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

import { EditBoardFormProps } from '../model/types/EditBoardProps'

export const EditBoardForm = ({
	form,
	isPending,
	onSubmit,
	t
}: EditBoardFormProps) => {
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
					disabled={isPending}
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
