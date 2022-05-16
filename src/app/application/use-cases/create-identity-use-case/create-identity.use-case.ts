import { Injectable, Logger } from '@nestjs/common';
import {
  DomainEvents,
  DomainId,
  EmailValueObject,
  IUseCase,
  Result,
} from 'types-ddd';

import { IdentityAggregate } from '../../../domain/aggregates/identity.aggregate';
import { IdentityRepository } from '../../../infra/database/identity.repository';
import { CreateIdentityDto } from './create-identity.dto';

@Injectable()
export class CreateIdentityUseCase
  implements IUseCase<CreateIdentityDto, Result<void>>
{
  private readonly logger = new Logger(CreateIdentityUseCase.name);

  constructor(private readonly identityRepository: IdentityRepository) {}

  async execute(dto: CreateIdentityDto): Promise<Result<IdentityAggregate>> {
    try {
      const identityFound = await this.identityRepository.findOne({
        email: dto.email,
      });
      this.logger.debug(dto.email);
      this.logger.debug(identityFound);

      if (identityFound) return Result.success(identityFound);

      const identityEmailOrError = EmailValueObject.create(dto.email);

      if (identityEmailOrError.isFailure) {
        const message = identityEmailOrError.errorValue();
        this.logger.error(message);
        return Result.fail(message);
      }

      const identityOrError = IdentityAggregate.create({
        ID: DomainId.create(),
        email: identityEmailOrError.getResult(),
        emailVerified: false,
      });

      if (identityOrError.isFailure) {
        const message = identityOrError.errorValue();
        this.logger.error(message);
        return Result.fail(message);
      }

      const identity = identityOrError.getResult();

      await this.identityRepository.save(identity);

      DomainEvents.dispatchEventsForAggregate(identity.id.value);

      return Result.success(identity);
    } catch (err) {
      this.logger.error('internal server error', err);
      return Result.fail('internal server error', 'INTERNAL_SERVER_ERROR');
    }
  }
}
