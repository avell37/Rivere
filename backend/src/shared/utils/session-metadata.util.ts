import type { Request } from 'express';
import { SessionMetadata } from '../types/session-metadata.types';
import { isDev } from './is-dev.util';
import { lookup } from 'geoip-lite';
import DeviceDetector = require('device-detector-js');
import * as countries from 'i18n-iso-countries';
import { ConfigService } from '@nestjs/config';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

export function getSessionMetadata(
    req: Request,
    userAgent: string,
    configService: ConfigService,
): SessionMetadata {
    const ip = isDev(configService)
        ? '173.166.164.121'
        : Array.isArray(req.headers['cf-connecting-ip'])
          ? req.headers['cf-connecting-ip'][0]
          : req.headers['cf-connecting-ip'] ||
            (typeof req.headers['x-forwarded-for'] === 'string'
                ? req.headers['x-forwarded-for'].split(',')[0]
                : req.ip) ||
            '0.0.0.0';

    const location = lookup(ip);
    const device = new DeviceDetector().parse(userAgent);

    return {
        location: {
            country: countries.getName(location?.country, 'en') || 'Unknown',
            city: location?.city || 'Unknown',
            latidute: location?.ll?.[0] ?? 0,
            longitude: location?.ll?.[1] ?? 0,
        },
        device: {
            browser: device.client?.name || 'Unknown',
            os: device.os?.name || 'Unknown',
            type: device.device?.type || 'Unknown',
        },
        ip,
    };
}
