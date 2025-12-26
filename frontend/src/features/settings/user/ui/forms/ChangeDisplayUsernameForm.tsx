import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeDisplayUsername } from '../../model/hooks/useChangeDisplayUsername'

export const ChangeDisplayUsernameForm = () => {
	const { form, onSubmit } = useChangeDisplayUsername()

	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Изменить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='displayUsername'
						label='Ваше отображаемое имя пользователя'
						placeholder='Введите ваше новое отображаемое имя пользователя'
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
