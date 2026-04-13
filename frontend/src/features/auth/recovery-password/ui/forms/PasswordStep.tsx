'use client'
import { useTranslations } from 'next-intl'

import { FormAuthWrapper, FormInputController } from '@/shared/ui/custom'

import { usePasswordStep } from '../../model/hooks/usePasswordStep'

export const PasswordStep = ({ token }: { token: string }) => {
	const t = useTranslations('auth.recoveryPassword')
	const { form, isPending, onSubmit } = usePasswordStep(token)

	return (
		<FormAuthWrapper
			form={form}
			isPending={isPending}
			buttonLabel={t('buttonLabel')}
			onSubmit={onSubmit}
		>
			<FormInputController
				name='newPassword'
				label={t('newPasswordLabel')}
				placeholder={t('newPasswordPlaceholder')}
				control={form.control}
				type='password'
			/>
			<FormInputController
				name='confirmPassword'
				label={t('confirmPasswordLabel')}
				placeholder={t('confirmPasswordPlaceholder')}
				control={form.control}
				type='password'
			/>
		</FormAuthWrapper>
	)
}
