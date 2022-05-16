import * as env from 'env-var';

import { IdentityEnvironment } from './identity-environment.interface';

export const commonEnvironment: Omit<IdentityEnvironment, 'production'> = {
  dbHost: env.get('DB_HOST').required().asString(),
  dbPort: env.get('DB_PORT').required().asPortNumber(),
  dbName: env.get('DB_NAME').required().asString(),
  dbUser: env.get('DB_USER').required().asString(),
  dbPass: env.get('DB_PASS').required().asString(),
  dbLogging: env.get('DB_LOGGING').default(1).asBool(),
};
