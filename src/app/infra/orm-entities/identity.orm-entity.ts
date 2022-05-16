import { BaseOrmEntity } from '@cryptowallet/services-common';
import { Column, Entity, Index, Unique } from 'typeorm';

@Entity('identities')
@Unique(['email'])
export class IdentityOrmEntity extends BaseOrmEntity {
  @Column()
  @Index()
  email: string;

  @Column({ default: false })
  emailVerified: boolean;
}
