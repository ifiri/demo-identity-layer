import { Injectable, Logger } from '@nestjs/common';
import { DomainId, IUseCase, PinValueObject, Result } from 'types-ddd';

import { IdentityVerificationAggregate } from '../../../domain/aggregates/identity-verification.aggregate';
import { IdentityAggregate } from '../../../domain/aggregates/identity.aggregate';
import { IdentityVerificationRepository } from '../../../infra/database/identity-verification.repository';
import { IdentityRepository } from '../../../infra/database/identity.repository';
import { RequestIdentityVerificationDto } from './request-identity-verification.dto';

@Injectable()
export class RequestIdentityVerificationUseCase
  implements IUseCase<RequestIdentityVerificationDto, Result<void>>
{
  private readonly logger = new Logger(RequestIdentityVerificationUseCase.name);

  constructor(
    private readonly identityRepository: IdentityRepository,
    private readonly identityVerificationRepository: IdentityVerificationRepository
  ) {}

  async execute(
    dto: RequestIdentityVerificationDto
  ): Promise<Result<IdentityAggregate>> {
    try {
      const identity = await this.identityRepository.findOne({
        id: dto.id,
      });

      if (!identity) return Result.fail('identity not found');

      const identityVerification = IdentityVerificationAggregate.create({
        ID: DomainId.create('sting'),
        code: PinValueObject.generatePin({
          numbersLength: 6,
          lettersLength: 0,
        }).getResult(),
        via: dto.via,
        identityId: identity.id.toValue() as string,
      });

      return Result.success(identity);
    } catch (err) {
      this.logger.error('internal server error', err);
      return Result.fail('internal server error', 'INTERNAL_SERVER_ERROR');
    }
  }
}
