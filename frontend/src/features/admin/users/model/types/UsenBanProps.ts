'use client'
import { UseFormReturn } from 'react-hook-form'

import { BanDurationUnit } from '@/shared/ui/custom'

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
