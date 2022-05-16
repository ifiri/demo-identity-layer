import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DomainEvents, IHandle } from 'types-ddd';

import { IdentityCreatedEvent } from '../../domain/events/identity-created.event';

@Injectable()
export class IdentityCreatedEventSubscriber
  implements IHandle<IdentityCreatedEvent>, OnModuleInit
{
  private readonly logger = new Logger(IdentityCreatedEventSubscriber.name);

  onModuleInit() {
    this.setupSubscriptions();
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      (event) => this.dispatch(Object.assign(event)),
      IdentityCreatedEvent.name
    );
  }

  async dispatch(event: IdentityCreatedEvent): Promise<void> {
    const { identity } = event;
    // The logic to be executed on mark a task as done goes here
    this.logger.verbose(`The identity ${identity.id.value} was created`);
  }
}
