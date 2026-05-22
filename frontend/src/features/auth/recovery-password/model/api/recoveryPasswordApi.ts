import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

export const resetPassword = async (data: {
	email: string
}): Promise<ActionResponse> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}reset-password`,
		data
	)
	return response.data
}

export const verifyResetToken = async (data: {
	token: string
}): Promise<ActionResponse> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}verify-reset-token`,
		data
	)
	return response.data
}

export const createNewPassword = async (data: {
	token: string
	newPassword: string
}): Promise<ActionResponse> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}create-new-password`,
		data
	)
	return response.data
}
