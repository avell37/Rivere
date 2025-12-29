import * as ua from 'ua-parser-js';

export function parseUserAgent(userAgent?: string) {
    if (!userAgent) {
        return {
            device: 'Неизвестное устройство',
            browser: 'Неизвестный браузер',
            os: 'Неизвестная ОС',
        };
    }

    const parser = new ua.UAParser(userAgent);
    const result = parser.getResult();

    return {
        device:
            result.device.vendor && result.device.model
                ? `${result.device.vendor} ${result.device.model}`
                : 'Desktop',
        browser: result.browser.name
            ? `${result.browser.name} ${result.browser.version ?? ''}`
            : 'Неизвестный браузер',
        os: result.os.name
            ? `${result.os.name} ${result.os.version ?? ''}`
            : 'Неизвестная ОС',
    };
}
