'use client'
import { MailCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { PRIVATE_URL } from '@/shared/libs'
import { OtpStep } from '@/shared/ui/custom'
import { Button } from '@/shared/ui/external'

import { useVerifyEmail } from '../model/hooks/useVerifyEmail'

export const VerifyEmailForm = ({
	onSuccess,
	showSkipLater = false
}: {
	onSuccess?: () => void
	showSkipLater?: boolean
}) => {
	const router = useRouter()
	const {
		code,
		setCode,
		handleVerifyEmail,
		verifyEmailPending,
		sendVerificationToken,
		sendTokenPending
	} = useVerifyEmail({ onSuccess })
	const t = useTranslations('auth.verifyEmail')

	return (
		<div className='flex items-center justify-center px-4'>
			<div className='max-w-md w-full text-center flex flex-col items-center'>
				<div className='mb-6 rounded-full bg-green-100 p-4'>
					<MailCheck className='w-10 h-10 text-green-600' />
				</div>
				<h1 className='text-2xl font-bold mb-2'>{t('title')}</h1>
				<p className='text-sm text-muted-foreground mb-6'>
					{t('description')}
				</p>
				<OtpStep
					value={code}
					onChange={setCode}
					onComplete={handleVerifyEmail}
					isPending={verifyEmailPending}
				/>
				<p className='text-sm text-muted-foreground my-6'>
					{t('notReceived')}
					<Button
						variant='none'
						size='none'
						className='ml-1 underline cursor-pointer'
						onClick={sendVerificationToken}
						disabled={sendTokenPending}
					>
						{t('sendToken')}
					</Button>
				</p>
				<span className='text-xs text-muted-foreground'>
					{t('span')}
				</span>
				{showSkipLater && (
					<Button
						type='button'
						variant='link'
						className='mt-6 text-muted-foreground'
						onClick={() => router.push(PRIVATE_URL.boards())}
					>
						{t('skipLater')}
					</Button>
				)}
			</div>
		</div>
	)
}
