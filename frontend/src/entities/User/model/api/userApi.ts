import { ChangeEmailRequest } from '@/features/settings/user/model/validation/change-email.z.validation'
import { ChangeNicknameRequest } from '@/features/settings/user/model/validation/change-nickname.z.validation'
import { ChangePasswordRequest } from '@/features/settings/user/model/validation/change-password.z.validation'
import { ChangeUsernameRequest } from '@/features/settings/user/model/validation/change-username.z.validation'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

export const getUser = async () => {
	const response = await baseAxios.get(`${API_URL.account()}`)
	return response.data
}

export const changeUsername = async (data: ChangeUsernameRequest) => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeUsername`,
		data
	)
	return response.data
}

export const changeEmail = async (data: ChangeEmailRequest) => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeEmail`,
		data
	)
	return response.data
}

export const changePassword = async (data: ChangePasswordRequest) => {
	const response = await baseAxios.post(
		`${API_URL.account()}changePassword`,
		data
	)
	return response.data
}

export const changeNickname = async (data: ChangeNicknameRequest) => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeNickname`,
		data
	)
	return response.data
}

export const uploadAvatar = async (file: File) => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await baseAxios.post(
		`${API_URL.account()}changeAvatar`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	)

	return response.data
}

export const logout = async () => {
	const response = await baseAxios.post(`${API_URL.session()}`)
	return response.data
}

export const findCurrentSession = async () => {
	const response = await baseAxios.get(`${API_URL.session()}`)
	return response.data
}
