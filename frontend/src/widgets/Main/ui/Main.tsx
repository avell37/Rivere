import { Footer } from './Footer'
import { MainHeader } from './MainHeader'
import { AdvantagesSection } from './sections/AdvantagesSection'
import { HeroSection } from './sections/HeroSection'
import { StartSection } from './sections/StartSection'
import { StepsSection } from './sections/StepsSection'

export const Main = async () => {
	return (
		<div className='relative min-h-screen bg-zinc-950 overflow-hidden'>
			<div className='absolute inset-0 bg-linear-to-br from-zinc-950 via-indigo-950 to-zinc-900' />

			<div className='relative z-10'>
				<div className='min-h-screen'>
					<MainHeader />

					<HeroSection />
					<AdvantagesSection />
					<StepsSection />
					<StartSection />

					<Footer />
				</div>
			</div>
		</div>
	)
}
