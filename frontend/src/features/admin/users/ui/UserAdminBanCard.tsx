'use client'
import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { UserAdminBanCardProps } from '../model/types/UsenBanProps'

export const UserAdminBanCard = ({
	form,
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
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='reason'
						label={t('banReasonLabel')}
						placeholder={t('banReasonPlaceholder')}
						control={form.control}
					/>
					<FormInputController
						name='durationInHours'
						label={t('durationInHoursLabel')}
						placeholder={t('durationInHoursPlaceholder')}
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
