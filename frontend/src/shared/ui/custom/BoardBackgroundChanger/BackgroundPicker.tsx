import { Control, Controller } from 'react-hook-form'

import { BOARD_BACKGROUND } from '@/shared/libs/boardBackgrounds'

import { Button } from '../../external'

export const BackgroundPicker = ({ control }: { control: Control<any> }) => {
	return (
		<Controller
			name='background'
			control={control}
			render={({ field }) => (
				<div className='flex flex-col gap-4'>
					<div className='flex flex-col gap-2'>
						<span className='text-sm text-gray-300'>Цвета</span>
						<div className='flex gap-4'>
							{BOARD_BACKGROUND.colors.map(bg => (
								<Button
									key={bg.id}
									type='button'
									onClick={() =>
										field.onChange({
											color: bg.color,
											url: null
										})
									}
									className={`w-8 h-8 rounded-full border-2 ${field.value?.color === bg.color ? 'border-white' : 'border-transparent'}`}
									style={{ background: bg.color }}
								/>
							))}
						</div>
					</div>

					<div className='flex flex-col gap-2'>
						<span className='text-sm text-gray-300'>Градиенты</span>
						<div className='flex gap-4'>
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
									className={`w-8 h-8 rounded-full border-2 ${field.value?.color === bg.color ? 'border-white' : 'border-transparent'}`}
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
