'use client'
import { KeyRound, Mail } from 'lucide-react'

import { IUser } from '@/entities/User'

import { VerifyEmailForm, useVerifyEmail } from '@/features/auth'
import { ChangeEmailForm, ChangePasswordForm } from '@/features/settings'

import { Modal } from '@/shared/ui/custom'
import { Badge, Button, Label } from '@/shared/ui/external'

interface SecurityProps {
	t: (key: string) => string
	user: IUser
}

export const UserSettingsSecurity = ({ t, user }: SecurityProps) => {
	const { sendVerificationToken } = useVerifyEmail()
	const isVerified = user.isEmailVerified

	return (
		<div className='flex flex-col gap-6 bg-sidebar p-4 px-2 rounded-lg border'>
			<div className='flex flex-col gap-1'>
				<div className='flex flex-col gap-1'>
					<div className='flex justify-between items-center gap-2 p-4 hover:bg-black rounded-sm w-full transition-all'>
						<div className='flex gap-4'>
							<div className='bg-linear-to-br from-orange-700 to-yellow-400 p-2 rounded-lg size-11'>
								<Mail size={28} />
							</div>
							<div className='flex flex-col'>
								<Label className='text-sm text-gray-300'>
									{t('security.emailLabel')}
								</Label>
								<div className='flex items-center gap-2'>
									<span className='text-sm'>
										{user?.email}
									</span>
									{!isVerified ? (
										<Badge variant='destructive'>
											{t(
												'security.emailVerificationBadgeUnverified'
											)}
										</Badge>
									) : (
										<Badge
											variant='default'
											className='bg-green-500 text-white'
										>
											{t(
												'security.emailVerificationBadgeVerified'
											)}
										</Badge>
									)}
								</div>
							</div>
						</div>
						<div className='flex gap-2'>
							{!isVerified && (
								<Modal
									trigger={
										<Button
											variant='outline'
											className='cursor-pointer'
											onClick={sendVerificationToken}
										>
											Подтвердить почту
										</Button>
									}
									contentClassname='max-w-lg'
								>
									<VerifyEmailForm />
								</Modal>
							)}
							<Modal
								trigger={
									<Button variant='outline'>
										{t('security.emailButton')}
									</Button>
								}
								contentClassname='max-w-md'
							>
								<ChangeEmailForm t={t} />
							</Modal>
						</div>
					</div>
				</div>
				<div className='flex gap-2'>
					<div className='flex justify-between items-center gap-2 p-4 hover:bg-black rounded-sm w-full transition-all'>
						<div className='flex gap-4'>
							<div className='bg-linear-to-br from-orange-700 to-yellow-400 p-2 rounded-lg'>
								<KeyRound size={28} />
							</div>
							<div>
								<Label className='text-sm text-gray-300'>
									{t('security.passwordLabel')}
								</Label>
								<span className='text-xs text-gray-400'>
									{t('security.passwordDescription')}
								</span>
							</div>
						</div>
						<Modal
							trigger={
								<Button variant='outline'>
									{t('security.passwordButton')}
								</Button>
							}
							contentClassname='max-w-md'
						>
							<ChangePasswordForm t={t} />
						</Modal>
					</div>
				</div>
			</div>
		</div>
	)
}
