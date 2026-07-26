import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

type EmptyStateProps = {
	children: ReactNode
	centered?: boolean
	className?: string
	variant?: 'default' | 'inline'
}

export const EmptyState = ({
	children,
	centered = false,
	className,
	variant = 'default'
}: EmptyStateProps) => (
	<div
		className={cn(
			'text-sm text-muted-foreground',
			variant === 'default' && 'rounded-xl border bg-card p-6',
			centered && 'text-center',
			className
		)}
	>
		{children}
	</div>
)
