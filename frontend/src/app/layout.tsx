import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl'
import "./globals.css";
import { getLocale, getMessages } from "next-intl/server";
import { SITE_DESCRIPTION, SITE_NAME } from "@/shared/libs/constants/seo.const";
import { ThemeProvider } from "@/shared/providers/ThemeProvider";
import { ToastProvider } from "@/shared/providers/ToastProvider";
import { QueryProvider } from "@/shared/providers/QueryProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  weight: "500"
})

export const metadata: Metadata = {
	title: {
		absolute: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	},
	description: SITE_DESCRIPTION,
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();
	const messages = await getMessages();

	return (
		<html lang={locale} suppressHydrationWarning>
			<body
				className={`${montserrat.variable} antialiased`}
			>
				<NextIntlClientProvider messages={messages}>
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							defaultTheme="dark"
							enableSystem
							disableTransitionOnChange
						>
							<ToastProvider />
							{children}
						</ThemeProvider>
					</QueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
