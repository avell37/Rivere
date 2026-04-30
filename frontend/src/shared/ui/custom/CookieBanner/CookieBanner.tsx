'use client'
import { useEffect, useState } from 'react'

import { Button } from '../../external'

export const CookieBanner = () => {
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const accepted = localStorage.getItem('cookieAccepted')
		if (!accepted) {
			setVisible(true)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookieAccepted', 'true')
		setVisible(false)
	}

	if (!visible) return null

	return (
		<div className='fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl z-50'>
			<div className='flex items-center justify-between gap-4 rounded-2xl border bg-background p-4 shadow-lg'>
				<p className='text-sm text-muted-foreground'>
					Мы используем cookies для авторизации и корректной работы
					сайта.
				</p>
				<Button onClick={handleAccept}>Принять</Button>
			</div>
		</div>
	)
}
