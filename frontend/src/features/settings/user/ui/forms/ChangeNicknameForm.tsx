'use client'
import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeNickname } from '../../model/hooks/useChangeNickname'

export const ChangeNicknameForm = ({ t }: { t: (key: string) => string }) => {
	const { form, isPending, onSubmit } = useChangeNickname()

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('personalInformation.nicknameModalSubmit')}
				closeText={t('personalInformation.nicknameModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
				isPending={isPending}
			>
				<FormInputController
					name='nickname'
					label={t('personalInformation.nicknameModalLabel')}
					placeholder={t(
						'personalInformation.nicknameModalPlaceholder'
					)}
					control={form.control}
					disabled={isPending}
				/>
			</FormWrapper>
		</Form>
	)
}
