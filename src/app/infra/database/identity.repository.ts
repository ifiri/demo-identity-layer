import { TypeormDddBaseRepository } from '@cryptowallet/services-common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdentityAggregate } from '../../domain/aggregates/identity.aggregate';
import { IIdentityRepository } from '../../domain/repo/identity-repository.interface';
import { IdentityMapper } from '../mappers/identity.mapper';
import { IdentityOrmEntity } from '../orm-entities/identity.orm-entity';

@Injectable()
export class IdentityRepository
  extends TypeormDddBaseRepository<IdentityAggregate, IdentityOrmEntity>
  implements IIdentityRepository<IdentityAggregate, IdentityOrmEntity>
{
  private readonly logger = new Logger(IdentityRepository.name);

  constructor(
    @InjectRepository(IdentityOrmEntity)
    private readonly identityRepo: Repository<IdentityOrmEntity>,
    private readonly identityMapper: IdentityMapper
  ) {
    super(identityRepo, identityMapper);
  }
}
