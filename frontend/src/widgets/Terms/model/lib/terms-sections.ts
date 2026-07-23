export type TermsSectionKey =
	| 'general'
	| 'service'
	| 'account'
	| 'acceptableUse'
	| 'prohibited'
	| 'content'
	| 'moderation'
	| 'termination'
	| 'liability'
	| 'changes'
	| 'contacts'

export interface TermsSectionConfig {
	key: TermsSectionKey
	paragraphs?: true
	items?: true
}

export const TERMS_SECTIONS: TermsSectionConfig[] = [
	{ key: 'general', paragraphs: true },
	{ key: 'service', paragraphs: true },
	{ key: 'account', paragraphs: true, items: true },
	{ key: 'acceptableUse', items: true },
	{ key: 'prohibited', items: true },
	{ key: 'content', paragraphs: true },
	{ key: 'moderation', paragraphs: true },
	{ key: 'termination', paragraphs: true },
	{ key: 'liability', paragraphs: true },
	{ key: 'changes', paragraphs: true },
	{ key: 'contacts', paragraphs: true }
]
