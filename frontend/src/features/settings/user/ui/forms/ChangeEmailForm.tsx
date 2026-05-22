'use client'
import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeEmail } from '../../model/hooks/useChangeEmail'

export const ChangeEmailForm = ({ t }: { t: (key: string) => string }) => {
	const { form, changeEmailPending, onSubmit } = useChangeEmail()

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('security.emailModalSubmit')}
				closeText={t('security.emailModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
				isPending={changeEmailPending}
			>
				<FormInputController
					name='email'
					label={t('security.emailModalLabel')}
					placeholder={t('security.emailModalPlaceholder')}
					control={form.control}
					disabled={changeEmailPending}
				/>
			</FormWrapper>
		</Form>
	)
}
