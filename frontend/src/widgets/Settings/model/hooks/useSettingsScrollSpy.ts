'use client'

import { useCallback, useEffect, useState } from 'react'

import { SettingsTab } from '../types/SettingsProps'

const SECTIONS: SettingsTab[] = [
	'profile',
	'security',
	'connections',
	'danger'
]

export const useSettingsScrollSpy = () => {
	const [activeSection, setActiveSection] = useState<SettingsTab>('profile')

	const scrollToSection = useCallback((id: SettingsTab) => {
		const element = document.getElementById(id)

		if (!element) return

		element.scrollIntoView({ behavior: 'smooth', block: 'start' })
		setActiveSection(id)
		window.history.replaceState(null, '', `#${id}`)
	}, [])

	useEffect(() => {
		const elements = SECTIONS.map(id => document.getElementById(id)).filter(
			Boolean
		) as HTMLElement[]

		if (!elements.length) return

		const observer = new IntersectionObserver(
			entries => {
				const visible = entries
					.filter(entry => entry.isIntersecting)
					.sort(
						(a, b) => b.intersectionRatio - a.intersectionRatio
					)

				if (visible[0]) {
					setActiveSection(visible[0].target.id as SettingsTab)
				}
			},
			{
				rootMargin: '-10% 0px -55% 0px',
				threshold: [0, 0.25, 0.5, 0.75, 1]
			}
		)

		elements.forEach(element => observer.observe(element))

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		const hash = window.location.hash.slice(1) as SettingsTab

		if (SECTIONS.includes(hash)) {
			requestAnimationFrame(() => scrollToSection(hash))
		}
	}, [scrollToSection])

	return { activeSection, scrollToSection }
}
