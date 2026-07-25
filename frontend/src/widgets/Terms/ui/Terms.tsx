'use client'

import { LegalDocumentPage } from '@/shared/ui/custom'

import { TERMS_SECTIONS } from '../model/lib/terms-sections'

export const Terms = () => (
	<LegalDocumentPage sections={TERMS_SECTIONS} translationNamespace='terms' />
)
