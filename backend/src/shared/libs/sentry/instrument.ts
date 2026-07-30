import 'dotenv/config';

import * as Sentry from '@sentry/nestjs';

import { getSentryOptions } from './sentry.options';

Sentry.init(getSentryOptions());
