/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { microserviceBootstrapper } from '@cryptowallet/bootstrapper';
import * as dotenv from 'dotenv';

import { AppModule } from './app/app.module';
import { IDENTITY_PACKAGE_NAME } from './generated/grpc/identity';

dotenv.config({
  path: 'development.env',
});

const IDENTITY_HOST = process.env.IDENTITY_HOST || '0.0.0.0';
const IDENTITY_PORT = process.env.IDENTITY_PORT || '5001';
const IDENTITY_URL = `${IDENTITY_HOST}:${IDENTITY_PORT}`;

microserviceBootstrapper(AppModule, IDENTITY_PACKAGE_NAME, IDENTITY_URL);
