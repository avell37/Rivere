import { Eye, EyeOff, Lock, Mail, User, UserIcon } from 'lucide-react'
import { FieldPath, FieldValues } from 'react-hook-form'

import { Button } from '@/shared/ui/external'

type RegisterFormValues = {
	username: string
	email: string
	password: string
	privacy: boolean
}

type LoginFormValues = {
	login: string
	password: string
}

interface FieldsProps {
	showPassword: boolean
	toggleShowPassword: () => void
	t: (key: string) => string
}

interface FieldConfig<T extends FieldValues> {
	name: FieldPath<T>
	type: string
	label: string
	placeholder: string
	icon?: React.ReactNode
	element?: React.ReactNode
}

const elementClass =
	'text-black group-hover:text-black/60 dark:text-white dark:group-hover:text-white/60 transition-colors duration-200'

export const LoginFields = (
	props: FieldsProps
): FieldConfig<LoginFormValues>[] => {
	const { t, showPassword, toggleShowPassword } = props

	return [
		{
			name: 'login',
			type: 'login',
			label: t('loginLabel'),
			placeholder: t('loginPlaceholder'),
			icon: <User className='stroke-black dark:stroke-white' size='16' />
		},
		{
			name: 'password',
			type: showPassword ? 'text' : 'password',
			label: t('passwordLabel'),
			placeholder: t('passwordPlaceholder'),
			icon: <Lock className='stroke-black dark:stroke-white' size='16' />,
			element: (
				<Button
					type='button'
					variant='none'
					size='none'
					onClick={toggleShowPassword}
					className='h-6 w-6 group cursor-pointer'
				>
					{showPassword ? (
						<EyeOff className={elementClass} />
					) : (
						<Eye className={elementClass} />
					)}
				</Button>
			)
		}
	]
}

export const RegistrationFields = (
	props: FieldsProps
): FieldConfig<RegisterFormValues>[] => {
	const { t, showPassword, toggleShowPassword } = props
	return [
		{
			name: 'username',
			type: 'text',
			label: t('usernameLabel'),
			placeholder: t('usernamePlaceholder'),
			icon: (
				<UserIcon
					className='stroke-black dark:stroke-white'
					size='16'
				/>
			)
		},
		{
			name: 'email',
			type: 'email',
			label: t('emailLabel'),
			placeholder: t('emailPlaceholder'),
			icon: <Mail className='stroke-black dark:stroke-white' size='16' />
		},
		{
			name: 'password',
			type: showPassword ? 'text' : 'password',
			label: t('passwordLabel'),
			placeholder: t('passwordPlaceholder'),
			icon: <Lock className='stroke-black dark:stroke-white' size='16' />,
			element: (
				<Button
					type='button'
					variant='none'
					size='none'
					onClick={toggleShowPassword}
					className='h-6 w-6 group cursor-pointer'
				>
					{showPassword ? (
						<EyeOff className={elementClass} />
					) : (
						<Eye className={elementClass} />
					)}
				</Button>
			)
		}
	]
}
