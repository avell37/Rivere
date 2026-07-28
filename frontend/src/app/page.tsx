import { createPageMetadata } from '@/shared/libs'

import { Main } from '@/widgets/Main'

export const generateMetadata = () =>
	createPageMetadata('home', {
		descriptionKey: 'startSection.description',
		path: '/'
	})

export default function MainPage() {
	return <Main />
}
