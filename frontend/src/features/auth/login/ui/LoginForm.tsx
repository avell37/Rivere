'use client'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { PUBLIC_URL } from '@/shared/libs'
import {
	FormAuthWrapper,
	FormInputController,
	LoginFields
} from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useLogin } from '../model/hooks/useLogin'

export const LoginForm = () => {
	const { form, loginPending, showPassword, toggleShowPassword, onSubmit } =
		useLogin()
	const t = useTranslations('auth.login')
	const loginFields = LoginFields({ showPassword, toggleShowPassword, t })
	const router = useRouter()

	return (
		<FormAuthWrapper
			form={form}
			isPending={loginPending}
			label={t('label')}
			buttonLabel={t('submitButton')}
			navigationLabel={t('navigationButton')}
			onSubmit={onSubmit}
		>
			{loginFields.map(field => (
				<div key={field.name}>
					{field.name === 'password' ? (
						<div className='flex flex-col gap-1'>
							<div className='flex justify-between text-sm'>
								<span>{field.label}</span>
								<Button
									variant='none'
									size='none'
									type='button'
									className='text-xs text-muted-foreground cursor-pointer hover:underline'
									onClick={() =>
										router.push(
											PUBLIC_URL.recoveryPassword()
										)
									}
								>
									{t('forgotPassword')}
								</Button>
							</div>

							<FormInputController
								control={form.control}
								{...field}
								label={undefined}
								className='pl-8'
								disabled={loginPending}
							/>
						</div>
					) : (
						<FormInputController
							key={field.name}
							control={form.control}
							{...field}
							className='pl-8'
							disabled={loginPending}
						/>
					)}
				</div>
			))}
		</FormAuthWrapper>
	)
}
