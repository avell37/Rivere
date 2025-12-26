import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../../external/Dialog/Dialog'

interface ModalProps {
	trigger: React.ReactNode
	title?: string
	description?: string
	contentClassname?: string
	children: React.ReactNode
}

export const Modal = ({
	trigger,
	title,
	description,
	contentClassname,
	children
}: ModalProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className={contentClassname}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description && (
						<DialogDescription>{description}</DialogDescription>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
