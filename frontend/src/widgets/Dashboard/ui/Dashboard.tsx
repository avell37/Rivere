import { Card, CardContent, CardHeader } from '@/shared/ui/external'

export const Dashboard = () => {
	const qwe = [
		{ id: 1, activity: 7 },
		{ id: 2, activity: 4 },
		{ id: 3, activity: 10 },
		{ id: 4, activity: 30 },
		{ id: 5, activity: 50 }
	]

	return (
		<div className='p-4'>
			<Card className='max-w-sm'>
				<CardHeader>Ваша активность:</CardHeader>
				<CardContent>
					<div className='flex flex-wrap gap-1'>
						{qwe.map(item => (
							<div
								key={item.id}
								className={`border p-2 ${item.activity > 7 ? 'bg-purple-500' : ''}`}
							/>
						))}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
