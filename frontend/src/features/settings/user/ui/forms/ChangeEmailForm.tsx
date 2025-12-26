import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangeEmail } from '../../model/hooks/useChangeEmail'

export const ChangeEmailForm = () => {
	const { form, onSubmit } = useChangeEmail()

	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Изменить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<FormInputController
						name='email'
						label='Ваша почта'
						placeholder='Введите вашу новую почту'
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
