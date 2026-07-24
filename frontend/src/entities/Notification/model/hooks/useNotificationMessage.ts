'use client'
import { useTranslations } from 'next-intl'

import { MESSAGE_KEYS } from '../lib/notificationMessageKeys'
import { INotification } from '../types/INotification'
import {
	NotificationMessageKey,
	NotificationMessageParams
} from '../types/NotificationProps'

const isMessageKey = (value: string): value is NotificationMessageKey =>
	MESSAGE_KEYS.includes(value as NotificationMessageKey)

const isAchievementCode = (
	value: string,
	tAchievements: ReturnType<typeof useTranslations<'achievements'>>
) => tAchievements.has(`${value}.title`)

export const useNotificationMessage = (
	notification: Pick<
		INotification,
		'message' | 'messageKey' | 'messageParams'
	>
) => {
	const t = useTranslations('notifications.messages')
	const tAchievements = useTranslations('achievements')

	if (notification.messageKey && isMessageKey(notification.messageKey)) {
		const rawParams = {
			...(notification.messageParams ?? {})
		} as NotificationMessageParams

		if (notification.messageKey === 'achievement') {
			const achievementCode = rawParams.achievementCode as
				| string
				| undefined
			const legacyTitle = rawParams.title as string | undefined

			if (
				achievementCode &&
				isAchievementCode(achievementCode, tAchievements)
			) {
				rawParams.title = tAchievements(`${achievementCode}.title`)
			} else if (legacyTitle) {
				rawParams.title = legacyTitle
			}

			delete rawParams.achievementCode
		}

		return t(notification.messageKey, rawParams)
	}

	return notification.message ?? ''
}
