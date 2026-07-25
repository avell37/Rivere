'use client'

import { BanDurationFields, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { UserAdminBanCardProps } from '../model/types/UsenBanProps'

export const UserAdminBanForm = ({
	form,
	banPending,
	t,
	onSubmit
}: UserAdminBanCardProps) => (
	<Form {...form}>
		<FormWrapper
			submitText={t('submitButton')}
			closeText={t('closeButton')}
			withClose
			handleSubmit={form.handleSubmit(onSubmit)}
			isPending={banPending}
		>
			<BanDurationFields
				control={form.control}
				disabled={banPending}
				t={t}
				reasonName='reason'
				durationName='duration'
				unitName='unit'
			/>
		</FormWrapper>
	</Form>
)
