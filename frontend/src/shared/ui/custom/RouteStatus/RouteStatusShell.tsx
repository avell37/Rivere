import { LucideIcon } from 'lucide-react'
import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

type RouteStatusShellProps = {
	icon: LucideIcon
	title: string
	description: string
	actions?: ReactNode
	variant?: 'default' | 'destructive'
}

export const RouteStatusShell = ({
	icon: Icon,
	title,
	description,
	actions,
	variant = 'default'
}: RouteStatusShellProps) => (
	<div className='flex min-h-screen items-center justify-center bg-background px-4 py-10'>
		<div className='relative w-full max-w-md'>
			<div
				aria-hidden
				className='pointer-events-none absolute -inset-px rounded-2xl bg-linear-to-br from-indigo-500/20 via-violet-500/10 to-transparent opacity-80'
			/>
			<div className='relative rounded-2xl border border-border bg-card p-8 text-center shadow-sm'>
				<div
					className={cn(
						'mx-auto mb-5 flex size-14 items-center justify-center rounded-full',
						variant === 'destructive'
							? 'bg-destructive/10 text-destructive'
							: 'bg-indigo-500/10 text-indigo-500 dark:text-indigo-400'
					)}
				>
					<Icon className='size-7' strokeWidth={1.75} />
				</div>

				<h1 className='text-xl font-semibold text-foreground'>
					{title}
				</h1>
				<p className='mt-2 text-sm leading-relaxed text-muted-foreground'>
					{description}
				</p>

				{actions ? (
					<div className='mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center'>
						{actions}
					</div>
				) : null}
			</div>
		</div>
	</div>
)
