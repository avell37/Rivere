import { ImageResponse } from 'next/og'

import {
	SITE_DESCRIPTION,
	SITE_NAME,
	SITE_TAGLINE
} from '@/shared/libs/constants/seo.const'

export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '72px 80px',
					background:
						'linear-gradient(135deg, #0F172A 0%, #1E1B4B 45%, #0F172A 100%)',
					color: '#ffffff',
					fontFamily: 'system-ui, sans-serif'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
					<div
						style={{
							display: 'flex',
							alignItems: 'flex-end',
							gap: 14,
							padding: 24,
							borderRadius: 28,
							background: 'rgba(255,255,255,0.06)',
							border: '1px solid rgba(255,255,255,0.08)'
						}}
					>
						<div
							style={{
								width: 18,
								height: 72,
								borderRadius: 8,
								background: '#3B82F6'
							}}
						/>
						<div
							style={{
								width: 18,
								height: 48,
								borderRadius: 8,
								background: '#60A5FA'
							}}
						/>
						<div
							style={{
								width: 18,
								height: 60,
								borderRadius: 8,
								background: '#93C5FD'
							}}
						/>
					</div>
					<div
						style={{
							fontSize: 72,
							fontWeight: 700,
							letterSpacing: '-0.04em'
						}}
					>
						{SITE_NAME}
					</div>
				</div>

				<div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
					<div
						style={{
							fontSize: 44,
							fontWeight: 600,
							lineHeight: 1.2,
							maxWidth: 900,
							color: '#E2E8F0'
						}}
					>
						{SITE_TAGLINE}
					</div>
					<div
						style={{
							fontSize: 28,
							lineHeight: 1.45,
							maxWidth: 920,
							color: '#94A3B8'
						}}
					>
						{SITE_DESCRIPTION}
					</div>
				</div>

				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						fontSize: 24,
						color: '#64748B'
					}}
				>
					<span>rivere.ru</span>
					<span>Kanban · Chat · Realtime</span>
				</div>
			</div>
		),
		size
	)
}
