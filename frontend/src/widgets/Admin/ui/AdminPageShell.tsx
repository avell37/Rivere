'use client'

import { ReactNode } from 'react'

import { LoadingCard, NavBar } from '@/shared/ui/custom'

type AdminPageShellProps = {
	isLoading: boolean
	loadingText?: string
	loadingFallback?: ReactNode
	beforeContent?: ReactNode
	children: ReactNode
}

export const AdminPageShell = ({
	isLoading,
	loadingText,
	loadingFallback,
	beforeContent,
	children
}: AdminPageShellProps) => (
	<div className='container mx-auto flex flex-col gap-6 pb-10'>
		<NavBar />
		{beforeContent}
		{isLoading
			? (loadingFallback ?? <LoadingCard>{loadingText}</LoadingCard>)
			: children}
	</div>
)
