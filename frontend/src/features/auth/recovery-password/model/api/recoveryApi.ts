import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

export const resetPassword = async (data: {
	email: string
}): Promise<boolean> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}reset-password`,
		data
	)
	return response.data
}

export const verifyResetToken = async (data: {
	token: string
}): Promise<boolean> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}verify-reset-token`,
		data
	)
	return response.data
}

export const createNewPassword = async (data: {
	token: string
	newPassword: string
}): Promise<boolean> => {
	const response = await baseAxios.post(
		`${API_URL.passwordRecovery()}create-new-password`,
		data
	)
	return response.data
}
