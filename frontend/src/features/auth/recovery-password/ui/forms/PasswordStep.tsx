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
			onSubmit={onSubmit}
			buttonLabel={t('buttonLabel')}
		>
			<FormInputController
				type='password'
				name='newPassword'
				label={t('newPasswordLabel')}
				placeholder={t('newPasswordPlaceholder')}
				control={form.control}
				disabled={isPending}
			/>
			<FormInputController
				type='password'
				name='confirmPassword'
				label={t('confirmPasswordLabel')}
				placeholder={t('confirmPasswordPlaceholder')}
				control={form.control}
				disabled={isPending}
			/>
		</FormAuthWrapper>
	)
}
