import { baseAxios } from '@/shared/api/interceptors'
import { API_URL } from '@/shared/libs'

import { AuthResponse } from '../types/AuthResponse'
import { SignInRequest } from '../validation/login.z.validation'
import { SignUpRequest } from '../validation/register.z.validation'

export const login = async (data: SignInRequest): Promise<AuthResponse> => {
	const response = await baseAxios.post(`${API_URL.session()}login`, data)
	return response.data
}

export const register = async (data: SignUpRequest): Promise<AuthResponse> => {
	const response = await baseAxios.post(`${API_URL.auth()}create`, data)
	return response.data
}
