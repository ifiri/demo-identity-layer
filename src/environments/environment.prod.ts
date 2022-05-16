import { commonEnvironment } from './common-environment';
import { IdentityEnvironment } from './identity-environment.interface';

export const environment: IdentityEnvironment = {
  production: true,
  ...commonEnvironment,
};
