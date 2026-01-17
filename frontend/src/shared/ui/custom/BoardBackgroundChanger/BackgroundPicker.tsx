'use client'
import { useTranslations } from 'next-intl'
import { Control, Controller } from 'react-hook-form'

import { BOARD_BACKGROUND } from '@/shared/config'

import { Button } from '../../external'

export const BackgroundPicker = ({ control }: { control: Control<any> }) => {
	const t = useTranslations('board.colors')

	return (
		<Controller
			name='background'
			control={control}
			render={({ field }) => (
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<span className='text-sm dark:text-gray-300'>
							{t('heading')}
						</span>
						<div className='flex flex-wrap gap-4'>
							{BOARD_BACKGROUND.gradients.map(bg => (
								<Button
									key={bg.id}
									type='button'
									onClick={() =>
										field.onChange({
											color: bg.color,
											url: null
										})
									}
									className={`w-8 h-8 rounded-full ${field.value?.color === bg.color ? 'border-white' : 'border-transparent'}`}
									style={{ background: bg.color }}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		/>
	)
}
