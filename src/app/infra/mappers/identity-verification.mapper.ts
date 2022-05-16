import { DomainId, IMapper, PinValueObject } from 'types-ddd';

import { IdentityVerificationAggregate } from '../../domain/aggregates/identity-verification.aggregate';
import { IdentityVerificationOrmEntity } from '../orm-entities/identity-verification.orm-entity';

export class IdentityVerificationMapper
  implements
    IMapper<IdentityVerificationAggregate, IdentityVerificationOrmEntity>
{
  toDomain(
    target: IdentityVerificationOrmEntity
  ): IdentityVerificationAggregate {
    return IdentityVerificationAggregate.create({
      ID: DomainId.create(target.id),
      code: PinValueObject.create(target.code).getResult(),
      via: target.via,
      identityId: target.identityId,
      createdAt: new Date(target.created),
      updatedAt: new Date(target.updated),
    }).getResult();
  }

  toPersistence(
    target: IdentityVerificationAggregate
  ): IdentityVerificationOrmEntity {
    return {
      id: target.id.toValue() as string,
      via: target.via,
      code: target.code,
      identityId: target.identityId,
      created: target.createdAt.toDateString(),
      updated: target.updatedAt.toDateString(),
    };
  }
}
