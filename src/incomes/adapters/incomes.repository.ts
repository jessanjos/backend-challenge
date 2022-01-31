import { NotFoundException } from '@nestjs/common';
import { AbstractRepository, EntityRepository } from 'typeorm';
import BusinessException from '../../exceptions/business.exception';
import { Income } from '../domain/income';
import { IncomeEntity } from './income.entity';

@EntityRepository(IncomeEntity)
export class IncomesRepository extends AbstractRepository<IncomeEntity> {
  async upsert(income: Income): Promise<Income> {
    try {
      return (await this.repository.save(IncomeEntity.from(income))).toIncome();
    } catch (exception: any) {
      if (exception?.code === 'ER_DUP_ENTRY') {
        throw new BusinessException(
          `An income with description ${income.description} and ${income.date} already exists`,
        );
      }
      throw exception;
    }
  }

  async findAll(): Promise<Income[]> {
    return (
      await this.repository.find({
        order: { createdAt: 'ASC' },
      })
    ).map((entity) => entity.toIncome());
  }

  async findById(id: string): Promise<Income> {
    const incomes = await this.repository.findByIds([id]);

    if (incomes.length === 0) {
      throw new NotFoundException('It was not found an income for given id');
    }

    return incomes[0].toIncome();
  }
}
