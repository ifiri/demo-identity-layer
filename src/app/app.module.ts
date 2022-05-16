import { TypeOrmConfig } from '@cryptowallet/services-common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { environment } from '../environments/environment';
import { IdentityEnvironment } from '../environments/identity-environment.interface';
import { IdentityCreatedEventSubscriber } from './application/subscribers/identity-created-event.subscriber';
import { CreateIdentityUseCase } from './application/use-cases/create-identity-use-case/create-identity.use-case';
import { RequestIdentityVerificationUseCase } from './application/use-cases/request-identity-verification-use-case/request-identity-verification.use-case';
import { IdentityEntrypoint } from './entrypoints/identity.entrypoint';
import { IdentityVerificationRepository } from './infra/database/identity-verification.repository';
import { IdentityRepository } from './infra/database/identity.repository';
import { IdentityVerificationMapper } from './infra/mappers/identity-verification.mapper';
import { IdentityMapper } from './infra/mappers/identity.mapper';
import { IdentityVerificationOrmEntity } from './infra/orm-entities/identity-verification.orm-entity';
import { IdentityOrmEntity } from './infra/orm-entities/identity.orm-entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        new TypeOrmConfig<IdentityEnvironment>(
          environment
        ).createTypeOrmOptions(),
    }),
    TypeOrmModule.forFeature([
      IdentityOrmEntity,
      IdentityVerificationOrmEntity,
    ]),
  ],
  controllers: [IdentityEntrypoint],
  providers: [
    IdentityMapper,
    IdentityVerificationMapper,
    IdentityRepository,
    IdentityVerificationRepository,
    CreateIdentityUseCase,
    RequestIdentityVerificationUseCase,
    IdentityCreatedEventSubscriber,
  ],
})
export class AppModule {}
