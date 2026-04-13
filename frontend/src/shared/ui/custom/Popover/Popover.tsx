import { PopoverContent, PopoverMain, PopoverTrigger } from '../../external'

interface PopoverProps {
	trigger?: React.ReactNode
	contentClassname?: string
	children: React.ReactNode
}

export const Popover = ({
	trigger,
	contentClassname,
	children
}: PopoverProps) => {
	return (
		<PopoverMain>
			{trigger && <PopoverTrigger asChild>{trigger}</PopoverTrigger>}
			<PopoverContent className={contentClassname}>
				{children}
			</PopoverContent>
		</PopoverMain>
	)
}
