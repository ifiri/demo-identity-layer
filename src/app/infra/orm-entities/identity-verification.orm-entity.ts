import { BaseOrmEntity } from '@cryptowallet/services-common';
import { Column, Entity } from 'typeorm';

import { RequestIdentityVerificationViaEnum } from '../../application/use-cases/request-identity-verification-use-case/request-identity-verification.dto';

@Entity('identity_verifications')
export class IdentityVerificationOrmEntity extends BaseOrmEntity {
  @Column()
  code: string;

  @Column({
    type: 'enum',
    enum: RequestIdentityVerificationViaEnum,
  })
  via: RequestIdentityVerificationViaEnum;

  @Column()
  identityId: string;
}
