'use client'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { PUBLIC_URL } from '@/shared/libs'

import { EmailStep } from './forms/EmailStep'
import { OtpStepContainer } from './forms/OtpStepContainer'
import { PasswordStep } from './forms/PasswordStep'

export const RecoveryPassword = () => {
	const t = useTranslations('auth.recoveryPassword')
	const router = useRouter()

	const [step, setStep] = useState(1)
	const [token, setToken] = useState('')
	const [email, setEmail] = useState('')

	return (
		<div className='relative flex flex-col w-full'>
			<div
				className='absolute top-2 cursor-pointer'
				onClick={() => router.push(PUBLIC_URL.login())}
			>
				<ArrowLeft />
			</div>
			<h1 className='text-2xl font-bold mb-2 text-center'>
				{t('heading')}
			</h1>
			<span className='text-sm text-muted-foreground text-center mb-4'>
				{t('step', { current: step, total: 3 })}
			</span>
			{step === 1 && (
				<EmailStep
					onNext={emailValue => {
						setEmail(emailValue)
						setStep(2)
					}}
				/>
			)}
			{step === 2 && (
				<OtpStepContainer
					onNext={() => setStep(3)}
					setToken={setToken}
					email={email}
				/>
			)}
			{step === 3 && <PasswordStep token={token} />}
		</div>
	)
}
