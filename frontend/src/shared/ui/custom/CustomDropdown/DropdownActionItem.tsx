'use client'

import { LucideIcon } from 'lucide-react'

import { cn } from '@/shared/utils'

import { DropdownMenuItem } from '../../external'

interface DropdownActionItemProps {
	icon?: LucideIcon
	children: React.ReactNode
	onClick?: () => void
	disabled?: boolean
	destructive?: boolean
	className?: string
}

export const DropdownActionItem = ({
	icon: Icon,
	children,
	onClick,
	disabled,
	destructive,
	className
}: DropdownActionItemProps) => {
	return (
		<DropdownMenuItem
			onClick={onClick}
			disabled={disabled}
			className={cn(
				'cursor-pointer',
				destructive && 'text-red-500 focus:text-red-500',
				className
			)}
		>
			{Icon && <Icon size={16} />}
			{children}
		</DropdownMenuItem>
	)
}
