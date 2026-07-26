import { Footer } from './Footer'
import { MainHeader } from './MainHeader'
import { AdvantagesSection } from './sections/AdvantagesSection'
import { HeroSection } from './sections/HeroSection'
import { StartSection } from './sections/StartSection'
import { StepsSection } from './sections/StepsSection'

export const Main = async () => {
	return (
		<div className='relative min-h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950'>
			<div className='absolute inset-0 bg-linear-to-b from-indigo-100/70 via-zinc-50 to-white dark:from-indigo-950/50 dark:via-zinc-950 dark:to-zinc-950' />
			<div
				className='absolute inset-0 opacity-30 dark:opacity-[0.18]'
				style={{
					backgroundImage:
						'radial-gradient(rgba(99,102,241,0.35) 1px, transparent 1px)',
					backgroundSize: '28px 28px'
				}}
			/>
			<div className='pointer-events-none absolute -top-48 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-indigo-400/15 blur-[160px] dark:bg-indigo-600/12' />
			<div className='pointer-events-none absolute top-1/2 -right-64 h-[600px] w-[600px] rounded-full bg-violet-400/10 blur-[120px] dark:bg-violet-600/8' />
			<div className='pointer-events-none absolute bottom-0 left-1/4 h-[400px] w-[500px] rounded-full bg-indigo-300/10 blur-[100px] dark:bg-indigo-700/6' />
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
