import { Eye, EyeClosed } from 'lucide-react'

import { FormInputController, FormWrapper } from '@/shared/ui/custom'
import { Form } from '@/shared/ui/external'

import { useChangePassword } from '../../model/hooks/useChangePassword'

export const ChangePasswordForm = ({ t }: { t: (key: string) => string }) => {
	const { form, passwordType, onSubmit, togglePasswords } =
		useChangePassword()

	return (
		<Form {...form}>
			<FormWrapper
				submitText={t('security.passwordModalSubmit')}
				closeText={t('security.passwordModalClose')}
				withClose
				handleSubmit={form.handleSubmit(onSubmit)}
			>
				<div className='flex flex-col gap-4'>
					<h1 className='font-bold'>
						{t('security.passwordModalTitle')}
					</h1>
					<FormInputController
						name='currentPassword'
						type={passwordType}
						placeholder={t('security.currentPasswordPlaceholder')}
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
						placeholder={t('security.newPasswordPlaceholder')}
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
						placeholder={t('security.confirmPasswordPlaceholder')}
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
