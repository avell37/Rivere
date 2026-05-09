'use client'
import { UseFormReturn } from 'react-hook-form'

export interface UserBanFormData {
	reason: string
	durationInHours: unknown
}

export interface UserAdminBanCardProps {
	form: UseFormReturn<UserBanFormData>
	banPending?: boolean
	t: (key: string) => string
	onSubmit: (data: UserBanFormData) => void
}
