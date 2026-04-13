import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { AuthResponse } from '@/shared/types/AuthResponse'

import { SignUpRequest } from '../validation/register.z.validation'

export const register = async (data: SignUpRequest): Promise<AuthResponse> => {
	const response = await baseAxios.post(`${API_URL.auth()}create`, data)
	return response.data
}
