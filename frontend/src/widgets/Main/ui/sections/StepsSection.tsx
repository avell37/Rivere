'use client'
import { LayoutDashboard, Pencil, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { AdvantageWithStep } from '../Advantage'

export const StepsSection = () => {
	const t = useTranslations('home')

	return (
		<section className='py-20 text-center'>
			<div className='max-w-6xl mx-auto px-4'>
				<h2 className='text-4xl font-bold mb-14 text-white'>
					{t('thirdSection.heading')}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					<AdvantageWithStep
						step={1}
						stepIcon={<Pencil className='text-white' />}
						title={t('thirdSection.firstStep.title')}
						text={t('thirdSection.firstStep.description')}
					/>
					<AdvantageWithStep
						step={2}
						stepIcon={<LayoutDashboard className='text-white' />}
						title={t('thirdSection.secondStep.title')}
						text={t('thirdSection.secondStep.description')}
					/>
					<AdvantageWithStep
						step={3}
						stepIcon={<Sparkles className='text-white' />}
						title={t('thirdSection.thirdStep.title')}
						text={t('thirdSection.thirdStep.description')}
					/>
				</div>
			</div>
		</section>
	)
}
