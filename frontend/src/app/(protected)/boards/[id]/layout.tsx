'use client'

import { useIsMobile } from '@/shared/config/useMobile'

export default function BoardLayout({
	children
}: {
	children: React.ReactNode
}) {
	const isMobile = useIsMobile()
	return (
		<div className={`h-full ${isMobile ? '' : 'overflow-hidden'}`}>
			{children}
		</div>
	)
}
