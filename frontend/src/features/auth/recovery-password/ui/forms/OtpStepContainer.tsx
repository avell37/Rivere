'use client'
import { useTranslations } from 'next-intl'

import { OtpStep } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useOtpStep } from '../../model/hooks/useOtpStep'

export const OtpStepContainer = ({
	email,
	onNext,
	setToken
}: {
	email: string
	onNext: () => void
	setToken: (token: string) => void
}) => {
	const t = useTranslations('auth.recoveryPassword')
	const {
		otp,
		verifyTokenPending,
		resendCodePending,
		setOtp,
		verify,
		resend
	} = useOtpStep({
		email,
		onNext,
		setToken
	})

	return (
		<div className='flex flex-col justify-center items-center'>
			<OtpStep
				value={otp}
				onChange={setOtp}
				onComplete={verify}
				isPending={verifyTokenPending}
			/>
			<p className='text-sm text-muted-foreground my-6'>
				{t('didntGetCode')}
				<Button
					variant='none'
					size='none'
					className='ml-1 underline cursor-pointer'
					disabled={resendCodePending}
					onClick={() => resend()}
				>
					{t('resendAgain')}
				</Button>
			</p>
			<span className='text-sm text-muted-foreground'>
				{t('checkSpam')}
			</span>
		</div>
	)
}
