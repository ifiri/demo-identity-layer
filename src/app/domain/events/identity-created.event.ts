import { IDomainEvent, UniqueEntityID } from 'types-ddd';

import { IdentityAggregate } from '../aggregates/identity.aggregate';

export class IdentityCreatedEvent implements IDomainEvent {
  public constructor(
    public readonly identity: IdentityAggregate,
    public readonly dateTimeOccurred = new Date()
  ) {}

  public getAggregateId(): UniqueEntityID {
    return this.identity.id.value;
  }
}
