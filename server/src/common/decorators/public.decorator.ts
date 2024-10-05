import { SetMetadata } from '@nestjs/common';
import { APP_CONSTANTS } from '../constants/app.constant';

export const Public = () => SetMetadata(APP_CONSTANTS.IS_PUBLIC_KEY, true);
