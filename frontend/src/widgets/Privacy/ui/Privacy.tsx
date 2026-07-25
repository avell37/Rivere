'use client'

import { LegalDocumentPage } from '@/shared/ui/custom'

import { SECTIONS } from '../model/lib/privacy-sections'

export const Privacy = () => (
	<LegalDocumentPage sections={SECTIONS} translationNamespace='privacy' />
)
