import { S3_URL } from '@/shared/libs'

const joinUrl = (base: string, path: string) => {
	const normalizedBase = base.replace(/\/+$/, '')
	const normalizedPath = path.replace(/^\/+/, '')
	return `${normalizedBase}/${normalizedPath}`
}

export const resolveAvatarUrl = (avatar?: string | null): string | undefined => {
	if (!avatar) {
		return undefined
	}

	if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
		return avatar
	}

	if (!S3_URL) {
		return undefined
	}

	return joinUrl(S3_URL, avatar)
}
