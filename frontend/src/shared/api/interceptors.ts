import axios, { type CreateAxiosDefaults } from 'axios'

import { SERVER_URL } from '../libs/constants/api.config'

const options: CreateAxiosDefaults = {
	baseURL: SERVER_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const baseAxios = axios.create(options)

export const authAxios = axios.create(options)
authAxios.interceptors.response.use(
	res => res,
	err => {
		if (err.response?.status === 401) {
			if (typeof window !== 'undefined') {
				const pathname = window.location.pathname
				const publicRoutes = ['/', '/privacy', '/auth']

				const isPublicRoute = publicRoutes.some(
					route => pathname === route || pathname.startsWith(route)
				)

				if (!isPublicRoute) {
					window.location.href = '/auth/login'
				}
			}
		}
		return Promise.reject(err)
	}
)
