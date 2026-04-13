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
baseAxios.interceptors.response.use(
	res => res,
	err => {
		if (err.response?.status === 401) {
			if (typeof window !== 'undefined') {
				const isAuthPage = window.location.pathname.includes('/auth')

				if (!isAuthPage) {
					window.location.href = '/auth/login'
				}
			}
		}
		return Promise.reject(err)
	}
)
