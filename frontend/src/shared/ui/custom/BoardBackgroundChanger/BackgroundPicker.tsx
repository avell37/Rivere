'use client'
import { useTranslations } from 'next-intl'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

import { BOARD_BACKGROUND } from '@/shared/config'

import { Button } from '../../external'

interface BackgroundPickerProps<T extends FieldValues> {
	control: Control<T>
	name?: Path<T>
}

export const BackgroundPicker = <T extends FieldValues>({
	control,
	name = 'background' as Path<T>
}: BackgroundPickerProps<T>) => {
	const t = useTranslations('board.colors')

	return (
		<Controller
			name={name}
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
