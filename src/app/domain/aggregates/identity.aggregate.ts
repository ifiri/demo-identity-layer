import {
  AggregateRoot,
  BaseDomainEntity,
  EmailValueObject,
  Result,
} from 'types-ddd';

import { IdentityCreatedEvent } from '../events/identity-created.event';

export interface IdentityProps extends BaseDomainEntity {
  email: EmailValueObject;
  emailVerified: boolean;
}

export class IdentityAggregate extends AggregateRoot<IdentityProps> {
  private constructor(props: IdentityProps) {
    super(props, IdentityAggregate.name);
    console.log(props.createdAt);
    if (!props.createdAt) {
      this.addDomainEvent(new IdentityCreatedEvent(this));
    }
  }

  get email() {
    return this.props.email.value;
  }

  get emailVerified() {
    return this.props.emailVerified;
  }

  public static create(props: IdentityProps): Result<IdentityAggregate> {
    return Result.ok(new IdentityAggregate(props));
  }
}
