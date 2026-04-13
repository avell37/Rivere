import { SignInRequest } from '@/features/auth'

import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'
import { AuthResponse } from '@/shared/types/AuthResponse'

export const login = async (data: SignInRequest): Promise<AuthResponse> => {
	const response = await baseAxios.post(`${API_URL.session()}login`, data)
	return response.data
}
