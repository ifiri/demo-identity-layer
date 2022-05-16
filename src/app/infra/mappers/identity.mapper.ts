import { Logger } from '@nestjs/common';
import { DomainId, EmailValueObject, IMapper } from 'types-ddd';

import { IdentityAggregate } from '../../domain/aggregates/identity.aggregate';
import { IdentityOrmEntity } from '../orm-entities/identity.orm-entity';

export class IdentityMapper
  implements IMapper<IdentityAggregate, IdentityOrmEntity>
{
  private logger = new Logger(IdentityMapper.name);

  toDomain(target: IdentityOrmEntity): IdentityAggregate {
    return IdentityAggregate.create({
      ID: DomainId.create(target.id),
      email: EmailValueObject.create(target.email).getResult(),
      emailVerified: target.emailVerified,
      createdAt: new Date(target.created),
      updatedAt: new Date(target.updated),
    }).getResult();
  }

  toPersistence(target: IdentityAggregate): IdentityOrmEntity {
    this.logger.debug(
      {
        id: target.id.toValue() as string,
        email: target.email,
        emailVerified: target.emailVerified,
        created: target.createdAt.toDateString(),
        updated: target.updatedAt.toDateString(),
      },
      'toPersistence'
    );
    return {
      id: target.id.toValue() as string,
      email: target.email,
      emailVerified: target.emailVerified,
      created: target.createdAt.toDateString(),
      updated: target.updatedAt.toDateString(),
    };
  }
}
