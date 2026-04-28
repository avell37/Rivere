import { SetMetadata } from '@nestjs/common';

export const SKIP_BAN_KEY = 'skipBan';

export const SkipBanCheck = () => SetMetadata(SKIP_BAN_KEY, true);
