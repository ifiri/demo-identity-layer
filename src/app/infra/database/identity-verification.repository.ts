import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DomainEvents, Filter } from 'types-ddd';

import { IdentityVerificationAggregate } from '../../domain/aggregates/identity-verification.aggregate';
import { IIdentityVerificationRepository } from '../../domain/repo/identity-verification-repository.interface';
import { IdentityVerificationMapper } from '../mappers/identity-verification.mapper';
import { IdentityVerificationOrmEntity } from '../orm-entities/identity-verification.orm-entity';

@Injectable()
export class IdentityVerificationRepository
  implements
    IIdentityVerificationRepository<
      IdentityVerificationAggregate,
      IdentityVerificationOrmEntity
    >
{
  private readonly logger = new Logger(IdentityVerificationRepository.name);

  constructor(
    @InjectRepository(IdentityVerificationOrmEntity)
    private readonly identityVerificationRepository: Repository<IdentityVerificationOrmEntity>,
    private readonly identityVerificationMapper: IdentityVerificationMapper
  ) {}

  async findOneIdentity(
    filter: Filter<Partial<IdentityVerificationOrmEntity>>
  ): Promise<IdentityVerificationAggregate | null> {
    const identityFound = await this.identityVerificationRepository.findOne({
      where: filter,
    });

    if (!identityFound) return null;

    return this.identityVerificationMapper.toDomain(identityFound);
  }

  async save(target: IdentityVerificationAggregate): Promise<void> {
    const identityOrmEntity =
      this.identityVerificationMapper.toPersistence(target);

    await this.identityVerificationRepository.save(identityOrmEntity);

    DomainEvents.dispatchEventsForAggregate(target.id.value);
  }

  async exists(
    filter: Filter<Partial<IdentityVerificationOrmEntity>>
  ): Promise<boolean> {
    const identityFound = await this.findOneIdentity(filter);

    return !!identityFound;
  }
}
