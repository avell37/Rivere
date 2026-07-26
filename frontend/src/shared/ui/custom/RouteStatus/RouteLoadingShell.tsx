import { Loader2 } from 'lucide-react'

export const RouteLoadingShell = ({ label }: { label: string }) => (
	<div className='flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4'>
		<div className='relative'>
			<div
				aria-hidden
				className='absolute inset-0 rounded-full bg-indigo-500/20 blur-xl'
			/>
			<div className='relative flex size-14 items-center justify-center rounded-full border border-border bg-card shadow-sm'>
				<Loader2
					className='size-7 animate-spin text-indigo-500 dark:text-indigo-400'
					strokeWidth={1.75}
				/>
			</div>
		</div>
		<p className='text-sm font-medium text-muted-foreground'>{label}</p>
	</div>
)
