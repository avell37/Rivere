'use client'
import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { UserAdminBanCardProps } from '../model/types/UsenBanProps'

export const UserAdminBanCard = ({
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
					<FormInputController
						name='durationInHours'
						label={t('durationInHoursLabel')}
						placeholder={t('durationInHoursPlaceholder')}
						control={form.control}
						disabled={banPending}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
