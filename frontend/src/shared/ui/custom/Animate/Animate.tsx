'use client'
import { type Variants, motion } from 'framer-motion'
import { createContext, useContext } from 'react'

export type AnimationPreset =
	| 'fadeUp'
	| 'fadeDown'
	| 'fadeIn'
	| 'fadeLeft'
	| 'fadeRight'
	| 'scaleIn'
	| 'blurUp'

const EASE_OUT_CUBIC: [number, number, number, number] = [
	0.215, 0.61, 0.355, 1.0
]
const EASE_OUT_QUART: [number, number, number, number] = [
	0.165, 0.84, 0.44, 1.0
]

const presets: Record<AnimationPreset, Variants> = {
	fadeUp: {
		hidden: { opacity: 0, y: 24 },
		visible: { opacity: 1, y: 0 }
	},
	fadeDown: {
		hidden: { opacity: 0, y: -24 },
		visible: { opacity: 1, y: 0 }
	},
	fadeIn: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 }
	},
	fadeLeft: {
		hidden: { opacity: 0, x: -32 },
		visible: { opacity: 1, x: 0 }
	},
	fadeRight: {
		hidden: { opacity: 0, x: 32 },
		visible: { opacity: 1, x: 0 }
	},
	scaleIn: {
		hidden: { opacity: 0, scale: 0.93 },
		visible: { opacity: 1, scale: 1 }
	},
	blurUp: {
		hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
		visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
	}
}

const motionTags = {
	div: motion.div,
	section: motion.section,
	span: motion.span,
	p: motion.p,
	h1: motion.h1,
	h2: motion.h2,
	h3: motion.h3,
	h4: motion.h4,
	li: motion.li,
	ul: motion.ul,
	ol: motion.ol,
	header: motion.header,
	footer: motion.footer,
	main: motion.main,
	article: motion.article,
	aside: motion.aside
} as const

export type AnimateAs = keyof typeof motionTags

const GroupContext = createContext(false)

export interface AnimateProps {
	children?: React.ReactNode
	animation?: AnimationPreset
	delay?: number
	duration?: number
	once?: boolean
	triggerOnView?: boolean
	viewportMargin?: string
	className?: string
	as?: AnimateAs
}

export const Animate = ({
	children,
	animation = 'fadeUp',
	delay = 0,
	duration = 0.55,
	once = true,
	triggerOnView = true,
	viewportMargin = '-60px',
	className,
	as = 'div'
}: AnimateProps) => {
	const inGroup = useContext(GroupContext)
	const Tag = motionTags[as]

	const transition = {
		duration,
		delay,
		ease: animation === 'blurUp' ? EASE_OUT_QUART : EASE_OUT_CUBIC
	}

	if (inGroup) {
		return (
			<Tag
				className={className}
				variants={presets[animation]}
				transition={transition}
			>
				{children}
			</Tag>
		)
	}

	if (!triggerOnView) {
		return (
			<Tag
				className={className}
				initial='hidden'
				animate='visible'
				variants={presets[animation]}
				transition={transition}
			>
				{children}
			</Tag>
		)
	}

	return (
		<Tag
			className={className}
			initial='hidden'
			whileInView='visible'
			viewport={{ once, margin: viewportMargin }}
			variants={presets[animation]}
			transition={transition}
		>
			{children}
		</Tag>
	)
}

export interface AnimateGroupProps {
	children?: React.ReactNode
	stagger?: number
	delayStart?: number
	once?: boolean
	className?: string
	as?: AnimateAs
}

export const AnimateGroup = ({
	children,
	stagger = 0.08,
	delayStart = 0,
	once = true,
	className,
	as = 'div'
}: AnimateGroupProps) => {
	const Tag = motionTags[as]

	return (
		<GroupContext.Provider value={true}>
			<Tag
				className={className}
				initial='hidden'
				whileInView='visible'
				viewport={{ once, margin: '-60px' }}
				variants={{
					hidden: {},
					visible: {
						transition: {
							delayChildren: delayStart,
							staggerChildren: stagger
						}
					}
				}}
			>
				{children}
			</Tag>
		</GroupContext.Provider>
	)
}
