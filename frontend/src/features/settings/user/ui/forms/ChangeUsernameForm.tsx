'use client'
import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeUsername } from '../../model/hooks/useChangeUsername'

export const ChangeUsernameForm = ({ t }: { t: (key: string) => string }) => {
	const { form, onSubmit } = useChangeUsername()

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('personalInformation.usernameModalSubmit')}
				closeText={t('personalInformation.usernameModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<FormInputController
					name='username'
					label={t('personalInformation.usernameModalLabel')}
					placeholder={t(
						'personalInformation.usernameModalPlaceholder'
					)}
					control={form.control}
				/>
			</FormWrapper>
		</Form>
	)
}
