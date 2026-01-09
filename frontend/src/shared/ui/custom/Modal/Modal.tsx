import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

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
					{title ? (
						<DialogTitle>{title}</DialogTitle>
					) : (
						<VisuallyHidden>
							<DialogTitle>{title}</DialogTitle>
						</VisuallyHidden>
					)}
					{description ? (
						<DialogDescription>{description}</DialogDescription>
					) : (
						<VisuallyHidden>
							<DialogDescription>{description}</DialogDescription>
						</VisuallyHidden>
					)}
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	)
}
