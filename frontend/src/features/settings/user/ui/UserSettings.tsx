'use client'
import { Monitor, Smartphone } from 'lucide-react'

import { useGetUser } from '@/features/auth/model/hooks/useGetUser'

import { SERVER_URL } from '@/shared/libs/constants/api.config'
import { customAvatar } from '@/shared/libs/customAvatar'
import { Modal } from '@/shared/ui/custom'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Input,
	Label,
	Separator
} from '@/shared/ui/external'

import { useUploadAvatar } from '../model/hooks/useUploadAvatar'

import { Session } from './Session'
import { ChangeEmailForm } from './forms/ChangeEmailForm'
import { ChangeNicknameForm } from './forms/ChangeNicknameForm'
import { ChangeUsernameForm } from './forms/ChangeUsernameForm'

export const UserSettings = () => {
	const {
		fileInputRef,
		isPending,
		handleChangeAvatarClick,
		handleFileChange
	} = useUploadAvatar()
	const { data: user } = useGetUser()

	return (
		<div className='flex flex-col items-center justify-center px-6 py-4 gap-8'>
			<h1 className='font-bold text-2xl'>Ваши настройки:</h1>
			<div className='flex flex-col gap-6 w-full'>
				<div className='flex flex-col justify-center items-center gap-4'>
					<Avatar className='w-64 h-64 rounded-full -z-1'>
						{user?.avatar ? (
							<AvatarImage src={`${SERVER_URL}${user?.avatar}`} />
						) : (
							<AvatarFallback>
								{customAvatar(user?.username || 'User')}
							</AvatarFallback>
						)}
					</Avatar>
					<Input
						type='file'
						accept='image/*'
						ref={fileInputRef}
						className='hidden'
						onChange={handleFileChange}
					/>
					<Button
						onClick={handleChangeAvatarClick}
						disabled={isPending}
					>
						Изменить
					</Button>
				</div>
				<h3 className='text-2xl font-bold'>Личная информация</h3>
				<Separator />
				<div className='grid grid-cols-2 gap-6'>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>Имя пользователя</Label>
							<Input
								className='w-full'
								disabled
								value={user?.username || ''}
							/>
						</div>
						<Modal
							trigger={<Button>Изменить</Button>}
							contentClassname='max-w-md'
						>
							<ChangeUsernameForm />
						</Modal>
					</div>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>Никнейм</Label>
							<Input
								className='w-full'
								disabled
								value={user?.nickname || ''}
							/>
						</div>
						<Modal
							trigger={<Button>Изменить</Button>}
							contentClassname='max-w-md'
						>
							<ChangeNicknameForm />
						</Modal>
					</div>
					<div className='flex items-end gap-2 w-full'>
						<div className='flex flex-col gap-2 w-full'>
							<Label>Почта</Label>
							<Input
								className='w-full'
								disabled
								value={user?.email || ''}
							/>
						</div>
						<Modal
							trigger={<Button>Изменить</Button>}
							contentClassname='max-w-md'
						>
							<ChangeEmailForm />
						</Modal>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-6 w-full'>
				<h3 className='text-2xl font-bold'>Сессии</h3>
				<Separator />
				<div className='border rounded-md p-4 flex flex-col gap-8'>
					<Session
						icon={<Smartphone />}
						title='IPhone 14 PRO'
						date='Последнее время входа: 27.01.2025, 12:45'
					/>
					<Session
						icon={<Smartphone />}
						title='Samsung DOUBLE RR'
						date='Последнее время входа: 13.06.2024, 16:43'
					/>
					<Session
						icon={<Smartphone />}
						title='Xiaomi Pro Poco Max 3Nuggets Audi'
						date='Последнее время входа: 01.05.2025, 06:44'
					/>
					<Session
						icon={<Monitor />}
						title='Macbook M2 PRO'
						date='Последнее время входа: 13.04.2025, 15:22'
					/>
				</div>
			</div>
		</div>
	)
}
