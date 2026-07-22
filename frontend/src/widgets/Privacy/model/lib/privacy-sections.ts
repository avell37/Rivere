export type PrivacySectionKey =
	| 'general'
	| 'operator'
	| 'definitions'
	| 'dataCollected'
	| 'purposes'
	| 'legalBasis'
	| 'cookies'
	| 'storage'
	| 'thirdParties'
	| 'moderation'
	| 'rights'
	| 'retention'
	| 'security'
	| 'changes'
	| 'contacts'

export interface PrivacySectionConfig {
	key: PrivacySectionKey
	paragraphs?: true
	items?: true
}

export const SECTIONS: PrivacySectionConfig[] = [
	{ key: 'general', paragraphs: true },
	{ key: 'operator', paragraphs: true },
	{ key: 'definitions', items: true },
	{ key: 'dataCollected', paragraphs: true, items: true },
	{ key: 'purposes', items: true },
	{ key: 'legalBasis', paragraphs: true, items: true },
	{ key: 'cookies', paragraphs: true },
	{ key: 'storage', paragraphs: true },
	{ key: 'thirdParties', paragraphs: true, items: true },
	{ key: 'moderation', paragraphs: true },
	{ key: 'rights', paragraphs: true, items: true },
	{ key: 'retention', paragraphs: true },
	{ key: 'security', paragraphs: true },
	{ key: 'changes', paragraphs: true },
	{ key: 'contacts', paragraphs: true }
]
