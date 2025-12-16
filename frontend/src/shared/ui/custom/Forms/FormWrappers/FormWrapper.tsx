import { Button, DialogClose } from '@/shared/ui/external'

interface FormWrapperProps {
	handleSubmit: () => void
	children: React.ReactNode
	className?: string
	buttonText?: string
	withClose?: boolean
}

export const FormWrapper = ({
	handleSubmit,
	children,
	buttonText,
	withClose
}: FormWrapperProps) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col gap-[30px] max-sm:px-2 w-full'
		>
			{children}
			<div className='flex justify-end gap-2.5'>
				<Button
					type='submit'
					className='flex justify-center items-center rounded-md 
                    border border-primary-900/30 hover:border-primary-900'
				>
					{buttonText}
				</Button>
				{withClose && (
					<DialogClose asChild>
						<Button
							type='button'
							className='flex justify-center items-center cancel-button'
						>
							Закрыть
						</Button>
					</DialogClose>
				)}
			</div>
		</form>
	)
}
