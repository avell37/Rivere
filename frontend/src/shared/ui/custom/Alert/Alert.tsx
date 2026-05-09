import { Button, Spinner } from '../../external'
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '../../external/AlertDialog/AlertDialog'

interface AlertProps {
	trigger?: React.ReactNode
	title: string
	description?: string
	actionText: string
	cancelText: string
	open?: boolean
	isPending?: boolean

	onSubmit?: () => void
	onOpenChange?: (open: boolean) => void
}

export const Alert = ({
	trigger,
	title,
	description,
	actionText,
	cancelText,
	isPending,
	open,
	onOpenChange,
	onSubmit
}: AlertProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger && (
				<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			)}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='dark:text-white'>
						{title}
					</AlertDialogTitle>
					{description && (
						<AlertDialogDescription className='text-sm'>
							{description}
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction asChild>
						<Button
							variant='destructive'
							onClick={e => {
								e.preventDefault()
								onSubmit?.()
							}}
							disabled={isPending}
							className='relative text-white hover:bg-red-900'
						>
							<span
								className={isPending ? 'invisible' : 'visible'}
							>
								{actionText}
							</span>

							{isPending && (
								<div className='absolute inset-0 flex items-center justify-center'>
									<Spinner />
								</div>
							)}
						</Button>
					</AlertDialogAction>
					<AlertDialogCancel disabled={isPending}>
						{cancelText}
					</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
