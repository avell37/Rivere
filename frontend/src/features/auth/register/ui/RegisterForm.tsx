'use client'
import { useTranslations } from 'next-intl'

import {
	FormAuthWrapper,
	FormInputController,
	LegalAgreementsCheckbox,
	RegistrationFields
} from '@/shared/ui/custom'

import { SocialAuthButtons } from '../../social/ui/SocialAuthButtons'
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
		<div className='flex flex-col gap-6'>
			<SocialAuthButtons disabled={isPending} />
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
						disabled={isPending}
					/>
				))}

				<LegalAgreementsCheckbox
					name='legalAccepted'
					control={form.control}
					isPending={isPending}
				/>
			</FormAuthWrapper>
		</div>
	)
}
