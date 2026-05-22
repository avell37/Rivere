import { ISession } from '@/entities/Session'

import { authAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { IUploadedAvatar, IUser } from '../types/IUser'
import { IUserStatistics } from '../types/IUserStatistics'
import { ChangeEmailRequest } from '../validation/change-email.z.validation'
import { ChangeNicknameRequest } from '../validation/change-nickname.z.validation'
import { ChangePasswordRequest } from '../validation/change-password.z.validation'
import { ChangeUsernameRequest } from '../validation/change-username.z.validation'

export const getUser = async (): Promise<IUser> => {
	const response = await authAxios.get(`${API_URL.account()}`)
	return response.data
}

export const getStatistics = async (): Promise<IUserStatistics> => {
	const response = await authAxios.get(`${API_URL.statistics()}`)
	return response.data
}

export const changeUsernameApi = async (
	data: ChangeUsernameRequest
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.account()}changeUsername`,
		data
	)
	return response.data
}

export const changeEmailApi = async (
	data: ChangeEmailRequest
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.account()}changeEmail`,
		data
	)
	return response.data
}

export const changePasswordApi = async (
	data: ChangePasswordRequest
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.account()}changePassword`,
		data
	)
	return response.data
}

export const changeNicknameApi = async (
	data: ChangeNicknameRequest
): Promise<ActionResponse> => {
	const response = await authAxios.post(
		`${API_URL.account()}changeNickname`,
		data
	)
	return response.data
}

export const uploadAvatarApi = async (file: File): Promise<IUploadedAvatar> => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await authAxios.post(
		`${API_URL.account()}changeAvatar`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	)

	return response.data
}

export const logoutApi = async (): Promise<ActionResponse> => {
	const response = await authAxios.post(`${API_URL.session()}`)
	console.log(response)
	return response.data
}

export const findCurrentSession = async (): Promise<ISession> => {
	const response = await authAxios.get(`${API_URL.session()}`)
	return response.data
}
