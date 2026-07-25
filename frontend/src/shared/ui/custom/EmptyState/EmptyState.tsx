import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

type EmptyStateProps = {
	children: ReactNode
	centered?: boolean
	className?: string
}

export const EmptyState = ({
	children,
	centered = false,
	className
}: EmptyStateProps) => (
	<div
		className={cn(
			'rounded-xl border bg-card p-6 text-sm text-muted-foreground',
			centered && 'text-center',
			className
		)}
	>
		{children}
	</div>
)
