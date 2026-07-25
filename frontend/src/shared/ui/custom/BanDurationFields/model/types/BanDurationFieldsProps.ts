import { Control, FieldValues, Path } from 'react-hook-form'

export enum BanDurationUnit {
	SECONDS = 'seconds',
	MINUTES = 'minutes',
	HOURS = 'hours',
	DAYS = 'days'
}

export type BanDurationFieldsProps<T extends FieldValues> = {
	control: Control<T>
	disabled?: boolean
	t: (key: string) => string
	reasonName: Path<T>
	durationName: Path<T>
	unitName: Path<T>
}
