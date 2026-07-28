import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Montserrat } from 'next/font/google'

import {
	SHARED_METADATA,
	SITE_NAME,
	THEME_COLOR,
	THEME_COLOR_LIGHT
} from '@/shared/libs/constants/seo.const'
import {
	QueryProvider,
	ThemeProviderClient,
	ToastProvider
} from '@/shared/providers'
import { CookieBanner } from '@/shared/ui/custom'

import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	weight: '500'
})

export const metadata: Metadata = {
	...SHARED_METADATA,
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: THEME_COLOR_LIGHT },
		{ media: '(prefers-color-scheme: dark)', color: THEME_COLOR }
	]
}

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const locale = await getLocale()
	const messages = await getMessages()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={`${montserrat.variable} antialiased h-full`}>
				<NextIntlClientProvider messages={messages}>
					<QueryProvider>
						<ThemeProviderClient>
							<ToastProvider />
							{children}
							<CookieBanner />
						</ThemeProviderClient>
					</QueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
