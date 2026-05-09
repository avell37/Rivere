'use client'
import { usePathname, useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { PUBLIC_URL } from '@/shared/libs'
import { Button, Form, Spinner } from '@/shared/ui/external'

interface FormWrapperProps<T extends FieldValues> {
	form: UseFormReturn<T>
	onSubmit: SubmitHandler<T>
	isPending: boolean
	children: React.ReactNode
	label?: string
	buttonLabel: string
	navigationLabel?: string
}

export const FormAuthWrapper = <T extends FieldValues>({
	form,
	isPending,
	label,
	buttonLabel,
	navigationLabel,
	children,
	onSubmit
}: FormWrapperProps<T>) => {
	const router = useRouter()
	const pathname = usePathname()

	const handleSwitch = () => {
		router.push(
			pathname.includes('login')
				? `${PUBLIC_URL.register()}`
				: `${PUBLIC_URL.login()}`
		)
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-6'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{children}
				<Button
					type='submit'
					className='w-full cursor-pointer text-white bg-linear-to-r from-pink-500 via-pink-700
						to-pink-500 bg-left transition-all duration-500 hover:bg-right bg-size-[200%_100%]'
					disabled={isPending}
				>
					{isPending ? <Spinner /> : buttonLabel}
				</Button>
				{label && navigationLabel && (
					<div className='text-center text-sm'>
						<span className='opacity-70'>{label}</span>{' '}
						<Button
							variant='none'
							size='none'
							type='button'
							className='p-0 h-auto cursor-pointer hover:underline transition-all duration-200'
							onClick={handleSwitch}
						>
							{navigationLabel}
						</Button>
					</div>
				)}
			</form>
		</Form>
	)
}
