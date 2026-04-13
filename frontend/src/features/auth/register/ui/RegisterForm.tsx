'use client'
import { useTranslations } from 'next-intl'

import {
	FormAuthWrapper,
	FormInputController,
	RegistrationFields
} from '@/shared/ui/custom'

import { useRegister } from '../model/hooks/useRegister'

export const RegisterForm = () => {
	const { form, isPending, showPassword, toggleShowPassword, onSubmit } =
		useRegister()
	const t = useTranslations('auth.register')
	const registerFields = RegistrationFields({
		showPassword,
		toggleShowPassword,
		t
	})

	return (
		<FormAuthWrapper
			form={form}
			isPending={isPending}
			label={t('label')}
			buttonLabel={t('submitButton')}
			navigationLabel={t('navigationButton')}
			onSubmit={onSubmit}
		>
			{registerFields.map(field => (
				<FormInputController
					key={field.name}
					control={form.control}
					{...field}
					className='pl-8'
				/>
			))}
		</FormAuthWrapper>
	)
}
