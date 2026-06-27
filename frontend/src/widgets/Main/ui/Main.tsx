import { Footer } from './Footer'
import { MainHeader } from './MainHeader'
import { AdvantagesSection } from './sections/AdvantagesSection'
import { HeroSection } from './sections/HeroSection'
import { StartSection } from './sections/StartSection'
import { StepsSection } from './sections/StepsSection'

export const Main = async () => {
	return (
		<div className='relative min-h-screen bg-zinc-950 overflow-hidden'>
			<div className='absolute inset-0 bg-linear-to-b from-indigo-950/50 via-zinc-950 to-zinc-950' />
			<div
				className='absolute inset-0 opacity-[0.18]'
				style={{
					backgroundImage:
						'radial-gradient(rgba(99,102,241,0.5) 1px, transparent 1px)',
					backgroundSize: '28px 28px'
				}}
			/>
			<div className='absolute -top-48 left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-indigo-600/12 blur-[160px] rounded-full pointer-events-none' />
			<div className='absolute top-1/2 -right-64 w-[600px] h-[600px] bg-violet-600/8 blur-[120px] rounded-full pointer-events-none' />
			<div className='absolute bottom-0 left-1/4 w-[500px] h-[400px] bg-indigo-700/6 blur-[100px] rounded-full pointer-events-none' />
			<div className='relative z-10'>
				<MainHeader />
				<HeroSection />
				<AdvantagesSection />
				<StepsSection />
				<StartSection />
				<Footer />
			</div>
		</div>
	)
}
