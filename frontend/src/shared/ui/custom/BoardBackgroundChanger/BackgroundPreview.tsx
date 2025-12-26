export const BackgroundPreview = ({
	background
}: {
	background: { color: string | null; url: string | null }
}) => {
	const isImage = Boolean(background.url)
	const isGradient = background.color?.includes('gradient')
	const isColorOrGradient = Boolean(background.color)
	return (
		<div
			className='w-full h-40 rounded-lg border border-gray-600 overflow-hidden transition-all'
			style={{
				backgroundColor: isColorOrGradient
					? background.color!
					: undefined,
				backgroundImage: isImage
					? `url(${background.url})`
					: isGradient
						? background.color!
						: undefined,
				backgroundSize: isImage ? 'cover' : '100% 100%',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat'
			}}
		>
			<div className='flex h-full p-3 gap-3 text-xs'>
				<div className='flex flex-col gap-2 w-1/3'>
					<div className='bg-neutral-900/20 rounded-md p-2 backdrop-blur-sm'>
						Todo
					</div>
				</div>
				<div className='flex flex-col gap-2 w-1/3'>
					<div className='bg-neutral-900/20 rounded-md p-2 backdrop-blur-sm'>
						В процессе
					</div>
				</div>
				<div className='flex flex-col gap-2 w-1/3'>
					<div className='bg-neutral-900/20 rounded-md p-2 backdrop-blur-sm'>
						Срочно сделать
					</div>
				</div>
			</div>
		</div>
	)
}
