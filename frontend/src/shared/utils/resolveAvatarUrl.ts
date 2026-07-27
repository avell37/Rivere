import { S3_URL } from '@/shared/libs'

export const resolveAvatarUrl = (avatar?: string | null): string | undefined => {
	if (!avatar) {
		return undefined
	}

	if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
		return avatar
	}

	return `${S3_URL}${avatar}`
}
