import { AbstractRepository, EntityRepository } from 'typeorm';
import { Income } from '../domain/income';
import { IncomeEntity } from './income.entity';

@EntityRepository(IncomeEntity)
export class IncomesRepository extends AbstractRepository<IncomeEntity> {
  async upsert(income: Income): Promise<Income> {
    return (await this.repository.save(IncomeEntity.from(income))).toIncome();
  }
}
