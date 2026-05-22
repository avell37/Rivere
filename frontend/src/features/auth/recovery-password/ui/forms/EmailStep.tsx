'use client'
import { useTranslations } from 'next-intl'

import { FormAuthWrapper, FormInputController } from '@/shared/ui/custom'

import { useEmailStep } from '../../model/hooks/useEmailStep'

export const EmailStep = ({ onNext }: { onNext: (email: string) => void }) => {
	const t = useTranslations('auth.recoveryPassword')
	const { form, sendCodePending, onSubmit } = useEmailStep({ onNext })

	return (
		<FormAuthWrapper
			form={form}
			isPending={sendCodePending}
			buttonLabel={t('buttonLabel')}
			onSubmit={onSubmit}
		>
			<FormInputController
				name='email'
				label={t('emailLabel')}
				placeholder={t('emailPlaceholder')}
				control={form.control}
				disabled={sendCodePending}
			/>
		</FormAuthWrapper>
	)
}
