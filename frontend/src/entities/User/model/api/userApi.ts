import { ChangeDisplayUsernameRequest } from '@/features/settings/user/model/validation/change-display-username.z.validation'
import { ChangeEmailRequest } from '@/features/settings/user/model/validation/change-email.z.validation'
import { ChangeUsernameRequest } from '@/features/settings/user/model/validation/change-username.z.validation'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs/constants/api.config'

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

export const changeDisplayUsername = async (
	data: ChangeDisplayUsernameRequest
) => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeDisplayUsername`,
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
