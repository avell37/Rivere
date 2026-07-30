export type TelegramSendResult =
    | { success: true; messageId: number }
    | { success: false; error: string };

type TelegramApiResponse = {
    ok: boolean;
    result?: { message_id?: number };
    description?: string;
    error_code?: number;
};

export function parseTelegramSendResponse(
    httpStatus: number,
    rawBody: string,
): TelegramSendResult {
    const trimmed = rawBody.trim();

    if (!trimmed) {
        return {
            success: false,
            error: `Empty Telegram API response (HTTP ${httpStatus})`,
        };
    }

    let payload: TelegramApiResponse;

    try {
        payload = JSON.parse(trimmed) as TelegramApiResponse;
    } catch {
        const preview = trimmed.slice(0, 120).replace(/\s+/g, ' ');

        return {
            success: false,
            error: `Invalid Telegram API response (HTTP ${httpStatus}): not JSON — ${preview}`,
        };
    }

    if (!payload.ok) {
        const code = payload.error_code ?? 'unknown';
        const description = payload.description ?? 'Unknown Telegram API error';

        return {
            success: false,
            error: `Telegram API error ${code}: ${description}`,
        };
    }

    const messageId = payload.result?.message_id;

    if (typeof messageId !== 'number') {
        return {
            success: false,
            error: `Telegram API returned ok=true without message_id (HTTP ${httpStatus})`,
        };
    }

    return { success: true, messageId };
}
