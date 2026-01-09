import { Card, CardContent } from '@/shared/ui/external'

export const StatisticsCard = ({ content }: { content: string }) => {
	return (
		<Card className='max-w-sm w-full gap-2'>
			<CardContent className='flex justify-center items-center font-bold min-h-16'>
				{content}
			</CardContent>
		</Card>
	)
}
