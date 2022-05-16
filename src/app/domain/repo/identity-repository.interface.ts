import { Filter, IBaseRepository } from 'types-ddd';

export interface IIdentityRepository<Aggregate, Model>
  extends IBaseRepository<Aggregate, Model> {
  save: (target: Aggregate) => Promise<void>;
}
