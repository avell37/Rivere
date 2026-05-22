'use client'
import { UseFormReturn } from 'react-hook-form'

import { BanDurationUnit } from './AdminUserTypes'

export interface UserBanFormData {
	reason: string
	duration: number | unknown
	unit: BanDurationUnit
}

export interface UserAdminBanCardProps {
	form: UseFormReturn<UserBanFormData>
	banPending?: boolean
	t: (key: string) => string
	onSubmit: (data: UserBanFormData) => void
}
