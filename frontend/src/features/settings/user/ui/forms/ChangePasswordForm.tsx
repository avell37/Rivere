import { Eye, EyeClosed } from 'lucide-react'

import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangePassword } from '../../model/hooks/useChangePassword'

export const ChangePasswordForm = () => {
	const { form, passwordType, onSubmit, togglePasswords } =
		useChangePassword()

	return (
		<Form {...form}>
			<FormWrapper
				buttonText='Изменить'
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<h1 className='font-bold'>Изменение пароля:</h1>
					<FormInputController
						name='currentPassword'
						type={passwordType}
						placeholder='Введите текущий пароль'
						element={
							<>
								{passwordType === 'password' ? (
									<Eye
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								) : (
									<EyeClosed
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								)}
							</>
						}
						control={form.control}
					/>
					<FormInputController
						name='newPassword'
						type={passwordType}
						placeholder='Введите новый пароль'
						element={
							<>
								{passwordType === 'password' ? (
									<Eye
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								) : (
									<EyeClosed
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								)}
							</>
						}
						control={form.control}
					/>
					<FormInputController
						name='confirmPassword'
						type={passwordType}
						placeholder='Подтвердите новый пароль'
						element={
							<>
								{passwordType === 'password' ? (
									<Eye
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								) : (
									<EyeClosed
										size='16'
										className='cursor-pointer'
										onClick={togglePasswords}
									/>
								)}
							</>
						}
						control={form.control}
					/>
				</div>
			</FormWrapper>
		</Form>
	)
}
