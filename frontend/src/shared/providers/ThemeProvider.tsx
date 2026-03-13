'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import * as React from 'react'

export function ThemeProviderClient({
	children
}: {
	children: React.ReactNode
}) {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='dark'
			enableSystem={false}
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	)
}

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
