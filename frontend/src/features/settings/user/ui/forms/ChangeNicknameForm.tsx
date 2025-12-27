import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeNickname } from '../../model/hooks/useChangeNickname'

export const ChangeNicknameForm = () => {
	const { form, onSubmit } = useChangeNickname()

	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Изменить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='nickname'
						label='Ваше отображаемое имя пользователя'
						placeholder='Введите ваше новое отображаемое имя пользователя'
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
