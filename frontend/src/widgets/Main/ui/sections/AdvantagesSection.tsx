'use client'
import { useTranslations } from 'next-intl'

import { advantageCards } from '../../model/lib/advantage.mapper'
import { Advantage } from '../Advantage'

export const AdvantagesSection = () => {
	const t = useTranslations('home')
	const advantages = advantageCards(t)

	return (
		<section className='py-24 text-center'>
			<div className='max-w-6xl mx-auto px-4'>
				<h2 className='text-4xl font-bold mb-14 text-white'>
					{t('secondSection.title')}
				</h2>

				<div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 *:lg:col-span-2
                    [&>*:nth-last-child(-n+2)]:lg:col-span-3'
				>
					{advantages.map(advantage => (
						<Advantage
							key={advantage.key}
							title={advantage.title}
							text={advantage.description}
							icon={advantage.icon}
							iconBg={advantage.wrapperIconClassname}
						/>
					))}
				</div>
			</div>
		</section>
	)
}
