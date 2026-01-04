import { AxiosError } from 'axios'
import { toast } from 'sonner'

export interface ApiError {
	message: string | string[]
	code?: string
	error: string
	statusCode: number
}

export const handleApiError = (err: unknown, t: (key: string) => string) => {
	if (err instanceof AxiosError) {
		const data = err.response?.data as ApiError

		if (data?.code) {
			const translated = t(data.code)
			if (translated !== data.code) {
				toast.error(translated !== data.code ? translated : data.code)
				return
			}
		}

		if (Array.isArray(data?.message)) {
			const translatedMessages = data.message.map(msg => {
				const translated = t(msg)
				return translated !== msg ? translated : msg
			})
			toast.error(translatedMessages.join(', '))
			return
		}

		if (typeof data?.message === 'string') {
			toast.error(data.message)
			return
		}
	}

	toast.error(t('errors.unexpected'))
}
