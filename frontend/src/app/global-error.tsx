'use client'

import * as Sentry from '@sentry/nextjs'
import { AlertTriangle } from 'lucide-react'
import { useEffect } from 'react'

export default function GlobalError({
	error,
	reset
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	useEffect(() => {
		Sentry.captureException(error)
	}, [error])

	return (
		<html lang='en'>
			<body className='antialiased'>
				<div className='flex min-h-screen items-center justify-center bg-[oklch(0.965_0.004_264)] px-4 dark:bg-[oklch(0.222_0_271)]'>
					<div className='w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm dark:border-white/10 dark:bg-[oklch(0.205_0_0)]'>
						<div className='mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-red-500/10 text-red-500'>
							<AlertTriangle className='size-7' strokeWidth={1.75} />
						</div>
						<h1 className='text-xl font-semibold text-black dark:text-white'>
							Something went wrong
						</h1>
						<p className='mt-2 text-sm text-black/60 dark:text-white/60'>
							A critical error occurred. Please refresh the page.
						</p>
						<button
							type='button'
							onClick={reset}
							className='mt-6 inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-500'
						>
							Try again
						</button>
					</div>
				</div>
			</body>
		</html>
	)
}
