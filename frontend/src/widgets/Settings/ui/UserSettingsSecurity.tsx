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
					<div
						className='flex flex-col sm:flex-row sm:items-center justify-between 
					gap-3 p-4 hover:bg-black/10 rounded-sm w-full transition-all'
					>
						<div className='flex gap-4'>
							<div className='bg-linear-to-br from-orange-700 to-yellow-400 p-2 rounded-lg size-11'>
								<Mail size={28} className='text-white' />
							</div>
							<div className='flex flex-col'>
								<div className='flex gap-2'>
									<Label className='text-sm text-black/90 dark:text-gray-300'>
										{t('security.emailLabel')}
									</Label>
									{!isVerified ? (
										<Badge variant='destructive'>
											{t(
												'security.emailVerificationBadgeUnverified'
											)}
										</Badge>
									) : (
										<Badge
											variant='default'
											className='bg-green-500 text-white py-0'
										>
											{t(
												'security.emailVerificationBadgeVerified'
											)}
										</Badge>
									)}
								</div>
								<div className='flex flex-wrap items-center gap-2'>
									<span className='text-sm'>
										{user?.email}
									</span>
								</div>
							</div>
						</div>
						<div className='flex flex-col sm:flex-row gap-2 w-full sm:w-auto'>
							{!isVerified && (
								<Modal
									trigger={
										<Button
											variant='outline'
											className='cursor-pointer'
											onClick={sendVerificationToken}
										>
											{t('security.verifyEmail')}
										</Button>
									}
									contentClassname='max-w-lg'
								>
									<VerifyEmailForm />
								</Modal>
							)}
							<Modal
								trigger={
									<Button
										variant='outline'
										className='cursor-pointer'
									>
										{t('security.emailButton')}
									</Button>
								}
								contentClassname='max-w-md'
								title={t('security.emailTitle')}
								description={t('security.emailDescription')}
							>
								<ChangeEmailForm t={t} />
							</Modal>
						</div>
					</div>
				</div>
				<div className='flex gap-2'>
					<div
						className='flex flex-col sm:flex-row sm:items-center justify-between 
					gap-3 p-4 hover:bg-black/10 rounded-sm w-full transition-all'
					>
						<div className='flex gap-4'>
							<div className='bg-linear-to-br from-orange-700 to-yellow-400 p-2 rounded-lg'>
								<KeyRound size={28} className='text-white' />
							</div>
							<div>
								<Label className='text-sm text-black/90 dark:text-gray-300'>
									{t('security.passwordLabel')}
								</Label>
								<span className='text-xs text-black/80 dark:text-gray-400'>
									{t('security.passwordSecret')}
								</span>
							</div>
						</div>
						<Modal
							trigger={
								<Button
									variant='outline'
									className='cursor-pointer'
								>
									{t('security.passwordButton')}
								</Button>
							}
							contentClassname='max-w-md'
							title={t('security.passwordTitle')}
							description={t('security.passwordDescription')}
						>
							<ChangePasswordForm t={t} />
						</Modal>
					</div>
				</div>
			</div>
		</div>
	)
}
