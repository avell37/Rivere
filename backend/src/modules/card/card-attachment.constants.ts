export const CARD_ATTACHMENT_MAX_BYTES = 10 * 1024 * 1024;
export const CARD_ATTACHMENT_MAX_COUNT = 10;

export const CARD_ATTACHMENT_ALLOWED_MIMES = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
] as const;

export function isAllowedCardAttachmentMime(mimetype: string) {
    return CARD_ATTACHMENT_ALLOWED_MIMES.includes(
        mimetype as (typeof CARD_ATTACHMENT_ALLOWED_MIMES)[number],
    );
}
