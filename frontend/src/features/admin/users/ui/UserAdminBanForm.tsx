'use client'
import {
	FormInputController,
	FormSelectController,
	FormWrapper
} from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { banDurationOptions } from '../model/lib/banOptionts'
import { UserAdminBanCardProps } from '../model/types/UsenBanProps'

export const UserAdminBanForm = ({
	form,
	banPending,
	t,
	onSubmit
}: UserAdminBanCardProps) => {
	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('submitButton')}
				closeText={t('closeButton')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
				isPending={banPending}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='reason'
						label={t('banReasonLabel')}
						placeholder={t('banReasonPlaceholder')}
						control={form.control}
						disabled={banPending}
					/>
					<div className='flex items-end gap-2'>
						<FormInputController
							name='duration'
							label={t('durationLabel')}
							placeholder={t('durationPlaceholder')}
							className='flex-1 w-full'
							control={form.control}
							disabled={banPending}
						/>
						<FormSelectController
							name='unit'
							className='flex-1 w-full'
							control={form.control}
							options={banDurationOptions(t)}
						/>
					</div>
				</div>
			</FormWrapper>
		</Form>
	)
}
