export const MENTION_TEXT_PATTERN = /(@[a-zA-Z0-9_]{2,32})/g

export const extractMentionQuery = (text: string, cursor: number) => {
	const before = text.slice(0, cursor)
	const match = before.match(/(^|\s)@([a-zA-Z0-9_]*)$/)

	if (!match) return null

	return match[2].toLowerCase()
}

export const insertMention = (
	text: string,
	cursor: number,
	username: string
) => {
	const before = text.slice(0, cursor)
	const after = text.slice(cursor)
	const replaced = before.replace(/(^|\s)@([a-zA-Z0-9_]*)$/, `$1@${username} `)

	return {
		nextText: `${replaced}${after}`,
		nextCursor: replaced.length
	}
}
