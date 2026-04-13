import { Eye, EyeOff, Lock, Mail, User, UserIcon } from 'lucide-react'

import { Button } from '@/shared/ui/external'

interface FieldsProps {
	showPassword: boolean
	toggleShowPassword: () => void
	t: (key: string) => string
}

const elementClass =
	'text-black group-hover:text-black/60 dark:text-white dark:group-hover:text-white/60 transition-colors duration-200'

export const LoginFields = ({
	showPassword,
	toggleShowPassword,
	t
}: FieldsProps) => [
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

export const RegistrationFields = ({
	showPassword,
	toggleShowPassword,
	t
}: FieldsProps) => [
	{
		name: 'username',
		type: 'text',
		label: t('usernameLabel'),
		placeholder: t('usernamePlaceholder'),
		icon: <UserIcon className='stroke-black dark:stroke-white' size='16' />
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
