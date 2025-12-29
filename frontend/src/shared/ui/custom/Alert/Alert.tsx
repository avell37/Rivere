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
	trigger: React.ReactNode
	title: string
	description?: string
	actionText: string
	cancelText: string
	onSubmit?: () => void
}

export const Alert = ({
	trigger,
	title,
	description,
	actionText,
	cancelText,
	onSubmit
}: AlertProps) => {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
			<AlertDialogContent className=''>
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
					<AlertDialogCancel>{cancelText}</AlertDialogCancel>
					<AlertDialogAction onClick={onSubmit}>
						{actionText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
