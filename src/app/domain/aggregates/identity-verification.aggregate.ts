import {
  AggregateRoot,
  BaseDomainEntity,
  PinValueObject,
  Result,
} from 'types-ddd';

import { RequestIdentityVerificationViaEnum } from '../../application/use-cases/request-identity-verification-use-case/request-identity-verification.dto';

export interface IdentityVerificationProps extends BaseDomainEntity {
  code: PinValueObject;
  via: RequestIdentityVerificationViaEnum;
  identityId: string;
}

export class IdentityVerificationAggregate extends AggregateRoot<IdentityVerificationProps> {
  private constructor(props: IdentityVerificationProps) {
    super(props, IdentityVerificationAggregate.name);
  }

  get code() {
    return this.props.code.value;
  }

  get via() {
    return this.props.via;
  }

  get identityId() {
    return this.props.identityId;
  }

  public static create(
    props: IdentityVerificationProps
  ): Result<IdentityVerificationAggregate> {
    return Result.ok(new IdentityVerificationAggregate(props));
  }
}
