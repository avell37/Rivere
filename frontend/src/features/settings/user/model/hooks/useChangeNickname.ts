'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	ChangeNicknameRequest,
	ChangeNicknameSchema,
	useChangeNicknameMutation
} from '@/entities/User'

export const useChangeNickname = () => {
	const t = useTranslations()
	const { changeNickname, changeNicknamePending } =
		useChangeNicknameMutation()

	const form = useForm<ChangeNicknameRequest>({
		resolver: zodResolver(ChangeNicknameSchema),
		defaultValues: {
			nickname: ''
		}
	})

	const onSubmit: SubmitHandler<ChangeNicknameRequest> = data =>
		changeNickname(data, {
			onSuccess: () => {
				form.reset()
				toast.success(t('profile.settings.security.nicknameChanged'))
			}
		})

	return {
		form,
		changeNicknamePending,
		onSubmit
	}
}
