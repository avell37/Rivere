interface AdvantageProps {
	step?: number
	stepIcon?: React.ReactNode
	title: string
	text: string
	icon?: React.ReactNode
	iconBg?: string
}

export const Advantage = ({ title, text, icon, iconBg }: AdvantageProps) => {
	return (
		<div
			className='flex flex-col items-center gap-4 rounded-2xl border p-8 
		shadow-[0_0_10px_rgba(180,0,255,0.2)] hover:shadow-[0_0_20px_rgba(180,0,255,0.4)] 
		transition duration-300 hover:-translate-y-2 cursor-pointer w-full'
		>
			<div
				className={`relative flex items-center justify-center 
			p-4 border ${iconBg} backdrop-blur-md rounded-xl`}
			>
				{icon}
			</div>
			<div className='flex justify-center items-center gap-2'>
				<h3 className='text-2xl font-semibold'>{title}</h3>
			</div>
			<p className='opacity-80'>{text}</p>
		</div>
	)
}

export const AdvantageWithStep = ({
	step,
	stepIcon,
	title,
	text
}: AdvantageProps) => {
	return (
		<div
			className='flex flex-col gap-4 rounded-2xl border p-8 
			shadow-[0_0_10px_rgba(180,0,255,0.2)] hover:shadow-[0_0_20px_rgba(180,0,255,0.4)] 
			transition duration-400 hover:-translate-y-2 cursor-pointer'
		>
			{step && stepIcon && (
				<div className='flex flex-col items-center gap-2'>
					<span className='text-3xl border p-2 px-4.5 rounded-full'>
						{step}
					</span>
					{stepIcon}
				</div>
			)}
			<div className='flex flex-col gap-2'>
				<h3 className='text-2xl font-semibold'>{title}</h3>
				<p className='opacity-80'>{text}</p>
			</div>
		</div>
	)
}
