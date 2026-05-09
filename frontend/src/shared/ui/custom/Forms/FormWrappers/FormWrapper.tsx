import { Button, DialogClose, Spinner } from '@/shared/ui/external'

interface FormWrapperProps {
	handleSubmit: () => void
	children: React.ReactNode
	className?: string
	submitText?: string
	withClose?: boolean
	closeText?: string
	isPending?: boolean
}

export const FormWrapper = ({
	handleSubmit,
	children,
	submitText,
	withClose,
	closeText,
	isPending
}: FormWrapperProps) => {
	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full'>
			{children}
			<div className='flex justify-end gap-2.5'>
				<Button
					variant='outline'
					type='submit'
					className='relative flex justify-center items-center rounded-md'
					disabled={isPending}
				>
					<span className={isPending ? 'invisible' : 'visible'}>
						{submitText}
					</span>

					{isPending && (
						<div className='absolute inset-0 flex items-center justify-center'>
							<Spinner />
						</div>
					)}
				</Button>
				{withClose && (
					<DialogClose asChild>
						<Button
							variant='outline'
							type='button'
							className='flex justify-center items-center'
							disabled={isPending}
						>
							{closeText}
						</Button>
					</DialogClose>
				)}
			</div>
		</form>
	)
}
