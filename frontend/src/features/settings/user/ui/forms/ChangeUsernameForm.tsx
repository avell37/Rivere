import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeUsername } from '../../model/hooks/useChangeUsername'

export const ChangeUsernameForm = () => {
	const { form, onSubmit } = useChangeUsername()

	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Изменить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='username'
						label='Ваше имя пользователя (с его помощью вы входите в систему)'
						placeholder='Введите ваше новое имя пользователя'
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
