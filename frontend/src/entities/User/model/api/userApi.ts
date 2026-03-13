import { ISession, ISessionActionsResponse } from '@/entities/Session'

import {
	ChangeEmailRequest,
	ChangeNicknameRequest,
	ChangePasswordRequest,
	ChangeUsernameRequest
} from '@/features/settings'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { IUploadedAvatar, IUser, IUserUpdateResponse } from '../types/IUser'
import { IUserStatistics } from '../types/IUserStatistics'

export const getUser = async (): Promise<IUser> => {
	const response = await baseAxios.get(`${API_URL.account()}`)
	return response.data
}

export const getStatistics = async (): Promise<IUserStatistics> => {
	const response = await baseAxios.get(`${API_URL.statistics()}`)
	return response.data
}

export const changeUsername = async (
	data: ChangeUsernameRequest
): Promise<IUserUpdateResponse> => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeUsername`,
		data
	)
	return response.data
}

export const changeEmail = async (
	data: ChangeEmailRequest
): Promise<IUserUpdateResponse> => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeEmail`,
		data
	)
	return response.data
}

export const changePassword = async (
	data: ChangePasswordRequest
): Promise<IUserUpdateResponse> => {
	const response = await baseAxios.post(
		`${API_URL.account()}changePassword`,
		data
	)
	return response.data
}

export const changeNickname = async (
	data: ChangeNicknameRequest
): Promise<IUserUpdateResponse> => {
	const response = await baseAxios.post(
		`${API_URL.account()}changeNickname`,
		data
	)
	return response.data
}

export const uploadAvatar = async (file: File): Promise<IUploadedAvatar> => {
	const formData = new FormData()
	formData.append('file', file)

	const response = await baseAxios.post(
		`${API_URL.account()}changeAvatar`,
		formData,
		{ headers: { 'Content-Type': 'multipart/form-data' } }
	)

	return response.data
}

export const logout = async (): Promise<ISessionActionsResponse> => {
	const response = await baseAxios.post(`${API_URL.session()}`)
	return response.data
}

export const findCurrentSession = async (): Promise<ISession[]> => {
	const response = await baseAxios.get(`${API_URL.session()}`)
	return response.data
}
