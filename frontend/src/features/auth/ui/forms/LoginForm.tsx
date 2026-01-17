'use client'
import { useTranslations } from 'next-intl'

import { FormAuthWrapper, FormInputController } from '@/shared/ui/custom'

import { useLogin } from '../../model/hooks/useLogin'
import { LoginFields } from '../AuthFields/AuthFields'

export const LoginForm = () => {
	const { form, isPending, showPassword, toggleShowPassword, onSubmit } =
		useLogin()
	const t = useTranslations('auth.login')
	const loginFields = LoginFields({ showPassword, toggleShowPassword, t })

	return (
		<FormAuthWrapper
			form={form}
			isPending={isPending}
			label={t('label')}
			buttonLabel={t('submitButton')}
			navigationLabel={t('navigationButton')}
			onSubmit={onSubmit}
		>
			{loginFields.map(field => (
				<FormInputController
					key={field.name}
					control={form.control}
					{...field}
					className='pl-8 custom-input'
				/>
			))}
		</FormAuthWrapper>
	)
}
