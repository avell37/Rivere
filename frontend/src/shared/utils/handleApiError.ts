import { AxiosError } from 'axios'
import { toast } from 'sonner'

export interface ApiError {
	message: string
	error: string
	statusCode: number
}

export const handleApiError = (err: unknown) => {
	if (err instanceof AxiosError) {
		const data = err.response?.data as ApiError

		if (data?.message) {
			const text = Array.isArray(data.message)
				? data.message.join(', ')
				: data.message
			toast.error(text)
			return
		}
	}

	toast.error('Произошла непредвиденная ошибка')
}
