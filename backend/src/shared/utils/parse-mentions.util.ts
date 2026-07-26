const MENTION_PATTERN = /@([a-zA-Z0-9_]{2,32})/g;

export function extractMentionUsernames(text: string): string[] {
    const matches = text.matchAll(MENTION_PATTERN);
    const usernames = new Set<string>();

    for (const match of matches) {
        usernames.add(match[1].toLowerCase());
    }

    return [...usernames];
}

export const MENTION_TEXT_PATTERN = /(@[a-zA-Z0-9_]{2,32})/g;
