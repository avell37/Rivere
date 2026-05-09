'use client'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import { InputOTP, InputOTPGroup, InputOTPSlot } from '../../external'

interface OtpStepProps {
	value: string
	onChange: (value: string) => void
	onComplete?: (value: string) => void
	isPending?: boolean
}

export const OtpStep = ({
	value,
	onChange,
	onComplete,
	isPending
}: OtpStepProps) => {
	return (
		<InputOTP
			id='digits-only'
			maxLength={6}
			pattern={REGEXP_ONLY_DIGITS}
			value={value}
			onChange={val => {
				onChange(val)

				if (val.length === 6 && !isPending) {
					onComplete?.(val)
				}
			}}
			disabled={isPending}
		>
			<InputOTPGroup className='mb-4'>
				{Array.from({ length: 6 }).map((el, idx) => (
					<InputOTPSlot key={idx} index={idx} />
				))}
			</InputOTPGroup>
		</InputOTP>
	)
}
