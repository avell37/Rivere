interface AdvantageProps {
	title: string
	text: string
	icon: React.ReactNode
}

export const Advantage = ({ title, text, icon }: AdvantageProps) => {
	return (
		<div className='flex flex-col gap-4 rounded-2xl border p-8 hover:shadow-lg transition'>
			<div className='flex items-center gap-2'>
				{icon}
				<h3 className='text-2xl font-semibold'>{title}</h3>
			</div>
			<p className='opacity-80'>{text}</p>
		</div>
	)
}
