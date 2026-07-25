'use client'

import { Button } from '@/shared/ui/external'
import { cn } from '@/shared/utils'

type LoadMoreButtonProps = {
	isLoading: boolean
	onClick: () => void
	loadMoreLabel: string
	loadingLabel: string
	className?: string
	variant?: 'outline' | 'ghost'
}

export const LoadMoreButton = ({
	isLoading,
	onClick,
	loadMoreLabel,
	loadingLabel,
	className,
	variant = 'outline'
}: LoadMoreButtonProps) => (
	<Button
		type='button'
		variant={variant}
		size='sm'
		className={cn(className)}
		disabled={isLoading}
		onClick={onClick}
	>
		{isLoading ? loadingLabel : loadMoreLabel}
	</Button>
)
