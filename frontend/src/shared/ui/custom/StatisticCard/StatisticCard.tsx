import { Card, CardContent, Separator } from '../../external'

interface StatisticCardProps {
	icon: React.ReactNode
	value: string | number
	description: string

	wrapperIconClassname?: string
	valueClassname?: string
	trend?: React.ReactNode
	bottomContent?: React.ReactNode
}

export const StatisticCard = ({
	icon,
	value,
	description,
	wrapperIconClassname,
	valueClassname,
	trend,
	bottomContent
}: StatisticCardProps) => {
	return (
		<Card className='max-w-[375px] w-full'>
			<CardContent className='relative flex flex-col gap-4'>
				<div
					className={`p-3 max-w-[50px] rounded-xl ${wrapperIconClassname}`}
				>
					{icon}
				</div>
				<div className='absolute top-0 right-6 text-xs bg-green-900 p-2 rounded-xl text-green-500 font-medium'>
					{trend}
				</div>
				<div>
					<span className={`text-2xl font-bold ${valueClassname}`}>
						{value}
					</span>
					<p className='text-xs text-muted-foreground'>
						{description}
					</p>
				</div>
				<Separator />
				<div>{bottomContent}</div>
			</CardContent>
		</Card>
	)
}
