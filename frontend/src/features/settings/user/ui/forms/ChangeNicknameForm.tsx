import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeNickname } from '../../model/hooks/useChangeNickname'

export const ChangeNicknameForm = ({ t }: { t: (key: string) => string }) => {
	const { form, onSubmit } = useChangeNickname()

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('personalInformation.nicknameModalSubmit')}
				closeText={t('personalInformation.nicknameModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='nickname'
						label={t('personalInformation.nicknameModalLabel')}
						placeholder={t(
							'personalInformation.nicknameModalPlaceholder'
						)}
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
