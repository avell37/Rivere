import { ReactNode } from 'react'

import { cn } from '@/shared/utils'

interface SettingsSectionProps {
	title: string
	description?: string
	destructive?: boolean
	children: ReactNode
	className?: string
}

export const SettingsSection = ({
	title,
	description,
	destructive,
	children,
	className
}: SettingsSectionProps) => (
	<div className={cn('flex flex-col gap-4', className)}>
		<div>
			<h2
				className={cn(
					'text-xl font-semibold',
					destructive && 'text-destructive'
				)}
			>
				{title}
			</h2>
			{description && (
				<p className='mt-1 text-sm text-muted-foreground'>
					{description}
				</p>
			)}
		</div>
		<div className='rounded-xl border bg-card p-4 md:p-6 flex flex-col gap-3'>
			{children}
		</div>
	</div>
)

interface SettingsSubsectionProps {
	title: string
	description?: string
	children: ReactNode
}

export const SettingsSubsection = ({
	title,
	description,
	children
}: SettingsSubsectionProps) => (
	<div className='flex flex-col gap-3 pt-1'>
		<div className='px-1'>
			<h3 className='text-sm font-medium'>{title}</h3>
			{description && (
				<p className='mt-0.5 text-xs text-muted-foreground'>
					{description}
				</p>
			)}
		</div>
		{children}
	</div>
)
