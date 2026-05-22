import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { ActionResponse } from '@/shared/types'

import { SignInRequest } from '../validation/login.z.validation'

export const loginApi = async (
	data: SignInRequest
): Promise<ActionResponse> => {
	const response = await baseAxios.post(`${API_URL.session()}login`, data)
	return response.data
}
