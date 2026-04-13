import React from 'react'

export const useBoardItem = (background?: {
	url?: string | null
	color?: string | null
}) => {
	const backgroundStyle: React.CSSProperties = {}

	if (background) {
		const { url, color } = background

		if (url) {
			backgroundStyle.backgroundImage = `url(${url})`
			backgroundStyle.backgroundSize = 'cover'
			backgroundStyle.backgroundPosition = 'center'
			backgroundStyle.backgroundRepeat = 'no-repeat'
		} else if (color) {
			if (color.includes('gradient')) {
				backgroundStyle.backgroundImage = color
				backgroundStyle.backgroundSize = 'cover'
				backgroundStyle.backgroundPosition = 'center'
			} else {
				backgroundStyle.backgroundColor = color
			}
		}
	}

	return {
		backgroundStyle
	}
}
