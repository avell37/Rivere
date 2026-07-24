import {
	ResolveReportFormOutput,
	ResolveReportPayload
} from '../validation/resolve-report.z.validation'

export const mapToPayload = (
	data: ResolveReportFormOutput
): ResolveReportPayload => {
	const resolutionNote = data.resolutionNote?.trim() || undefined

	switch (data.decision) {
		case 'DISMISS':
			return { status: 'DISMISSED', resolutionNote }
		case 'RESOLVE_NONE':
			return { status: 'RESOLVED', action: 'NONE', resolutionNote }
		case 'BAN_USER':
			return {
				status: 'RESOLVED',
				action: 'BAN_USER',
				resolutionNote,
				ban: {
					reason: data.banReason!.trim(),
					duration: data.banDuration!,
					unit: data.banUnit!
				}
			}
		case 'DELETE_MESSAGE':
			return {
				status: 'RESOLVED',
				action: 'DELETE_MESSAGE',
				resolutionNote
			}
		case 'DELETE_CARD':
			return {
				status: 'RESOLVED',
				action: 'DELETE_CARD',
				resolutionNote
			}
	}
}
