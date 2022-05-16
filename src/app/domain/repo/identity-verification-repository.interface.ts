import { Filter } from 'types-ddd';

export interface IIdentityVerificationRepository<Aggregate, Model> {
  save: (target: Aggregate) => Promise<void>;
  findOneIdentity: (
    filter: Filter<Partial<Model>>
  ) => Promise<Aggregate | null>;
  exists: (filter: Filter<Partial<Model>>) => Promise<boolean>;
}
