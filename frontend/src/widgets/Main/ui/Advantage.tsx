interface AdvantageProps {
	title: string
	text: string
}

export const Advantage = ({ title, text }: AdvantageProps) => {
	return (
		<div className='rounded-2xl border p-8 hover:shadow-lg transition'>
			<h3 className='text-2xl font-semibold mb-3'>{title}</h3>
			<p className='opacity-80'>{text}</p>
		</div>
	)
}
