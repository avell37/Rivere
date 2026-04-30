import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { Montserrat } from 'next/font/google'

import { SITE_DESCRIPTION, SITE_NAME } from '@/shared/libs/constants/seo.const'
import {
	QueryProvider,
	ThemeProviderClient,
	ToastProvider
} from '@/shared/providers'
import { CookieBanner } from '@/shared/ui/custom/CookieBanner/CookieBanner'

import './globals.css'

const montserrat = Montserrat({
	variable: '--font-montserrat',
	weight: '500'
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION
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
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
			</head>
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
