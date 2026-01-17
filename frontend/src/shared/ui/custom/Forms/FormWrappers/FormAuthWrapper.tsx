'use client'
import { usePathname, useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form'

import { AuthSocials } from '@/features/auth'

import { PUBLIC_URL } from '@/shared/libs'
import { Button, Form, Separator } from '@/shared/ui/external'

interface FormWrapperProps<T extends FieldValues> {
	form: UseFormReturn<T>
	onSubmit: SubmitHandler<T>
	isPending: boolean
	children: React.ReactNode
	label: string
	buttonLabel: string
	navigationLabel: string
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
				? `${PUBLIC_URL.auth()}/register`
				: `${PUBLIC_URL.auth()}/login`
		)
	}

	return (
		<Form {...form}>
			<form
				className='flex flex-col gap-6'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				{children}
				<Button type='submit' className='w-full' disabled={isPending}>
					{buttonLabel}
				</Button>
				<Separator />
				<AuthSocials />
				<div className='text-center text-sm'>
					<span className='opacity-70'>{label}</span>{' '}
					<Button
						variant='ghost'
						size='none'
						type='button'
						className='p-0 h-auto underline'
						onClick={handleSwitch}
					>
						{navigationLabel}
					</Button>
				</div>
			</form>
		</Form>
	)
}
