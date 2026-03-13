'use client'
import Link from 'next/link'

import {
	Button,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/external'

import { AuthWrapperProps } from '../../model/types/AuthWrapperProps'

export const AuthWrapper = ({
	children,
	btnLabel,
	btnHref
}: AuthWrapperProps) => {
	return (
		<div className='min-h-screen flex justify-center items-center px-4'>
			<Card className='max-w-md w-full gap-4'>
				<CardHeader className='text-center pt-6'>
					<CardTitle className='font-bold text-2xl'>Rivere</CardTitle>
				</CardHeader>
				<CardContent className='px-10'>{children}</CardContent>
				{btnLabel && btnHref && (
					<CardFooter>
						<Button
							type='submit'
							variant='ghost'
							className='w-full mt-5'
							asChild
						>
							<Link href={btnHref}>{btnLabel}</Link>
						</Button>
					</CardFooter>
				)}
			</Card>
		</div>
	)
}
