'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export const Privacy = () => {
	const t = useTranslations('privacy')

	return (
		<div className='max-w-6xl w-full mx-auto py-10 pt-25 px-4 space-y-6 prose dark:prose-invert'>
			<h1 className='text-2xl font-bold'>{t('heading')}</h1>

			<section>
				<h2 className='font-semibold'>{t('first.heading')}</h2>
				<p>{t('first.description')}</p>
			</section>

			<section>
				<h2 className='font-semibold'>{t('second.heading')}</h2>
				<ul className='list-disc pl-5'>
					<li>{t('second.firstData')}</li>
					<li>{t('second.secondData')}</li>
					<li>{t('second.thirdData')}</li>
					<li>{t('second.fourthData')}</li>
					<li>{t('second.fifthData')}</li>
				</ul>
			</section>

			<section>
				<h2 className='font-semibold'>{t('third.heading')}</h2>
				<ul className='list-disc pl-5'>
					<li>{t('third.firstData')}</li>
					<li>{t('third.secondData')}</li>
					<li>{t('third.thirdData')}</li>
					<li>{t('third.fourthData')}</li>
				</ul>
			</section>

			<section>
				<h2 className='font-semibold'>{t('fourth.heading')}</h2>
				<p>{t('fourth.description')}</p>
			</section>

			<section>
				<h2 className='font-semibold'>{t('fifth.heading')}</h2>
				<p>{t('fifth.description')}</p>
			</section>

			<section>
				<h2 className='font-semibold'>{t('sixth.heading')}</h2>
				<p>{t('sixth.description')}</p>
			</section>

			<section>
				<h2 className='font-semibold'>{t('seventh.heading')}</h2>
				<ul className='list-disc pl-5'>
					<li>{t('seventh.firstData')}</li>
					<li>{t('seventh.secondData')}</li>
					<li>{t('seventh.thirdData')}</li>
				</ul>
			</section>

			<section>
				<h2 className='font-semibold'>{t('eighth.heading')}</h2>
				<p>
					{t('eighth.description')}{' '}
					<Link href='mailto:help@rivere.ru' className='underline'>
						help@rivere.ru
					</Link>
				</p>
			</section>
		</div>
	)
}
