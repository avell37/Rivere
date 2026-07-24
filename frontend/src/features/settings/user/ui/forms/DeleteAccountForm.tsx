'use client'
import { useTranslations } from 'next-intl'

import { FormInputController, Modal } from '@/shared/ui/custom'
import { Button, Form } from '@/shared/ui/external'

import { useDeleteAccount } from '../../model/hooks/useDeleteAccount'

export const DeleteAccountForm = () => {
	const t = useTranslations('profile.settings.dangerZone')
	const { form, isPending, open, setOpen, onSubmit } = useDeleteAccount()

	return (
		<Modal
			open={open}
			onOpenChange={nextOpen => {
				setOpen(nextOpen)
				if (!nextOpen) form.reset()
			}}
			trigger={
				<Button variant='destructive' className='w-full sm:w-auto'>
					{t('deleteButton')}
				</Button>
			}
			title={t('title')}
			description={t('description')}
			contentClassname='max-w-md'
		>
			<Form {...form}>
				<form onSubmit={onSubmit} className='flex flex-col gap-4'>
					<p className='text-sm text-muted-foreground'>
						{t('warning')}
					</p>
					<FormInputController
						name='currentPassword'
						label={t('passwordLabel')}
						placeholder={t('passwordPlaceholder')}
						control={form.control}
						type='password'
						disabled={isPending}
					/>
					<div className='flex justify-end gap-2'>
						<Button
							type='button'
							variant='ghost'
							onClick={() => setOpen(false)}
							disabled={isPending}
						>
							{t('cancel')}
						</Button>
						<Button
							type='submit'
							variant='destructive'
							disabled={isPending}
						>
							{isPending ? t('submitting') : t('confirmAction')}
						</Button>
					</div>
				</form>
			</Form>
		</Modal>
	)
}
