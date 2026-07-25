import { ReactNode } from 'react'

type LoadingCardProps = {
	children: ReactNode
}

export const LoadingCard = ({ children }: LoadingCardProps) => (
	<div className='rounded-xl border bg-card p-6 text-sm text-muted-foreground'>
		{children}
	</div>
)
