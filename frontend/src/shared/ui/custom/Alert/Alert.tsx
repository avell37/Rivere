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
	onSubmit?: () => void
	onOpenChange?: (open: boolean) => void
}

export const Alert = ({
	trigger,
	title,
	description,
	actionText,
	cancelText,
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
					<AlertDialogTitle className='text-white'>
						{title}
					</AlertDialogTitle>
					{description && (
						<AlertDialogDescription className='text-xs text-red-400'>
							{description}
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={onSubmit}>
						{actionText}
					</AlertDialogAction>
					<AlertDialogCancel>{cancelText}</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
