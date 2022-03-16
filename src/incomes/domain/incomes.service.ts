import { Injectable } from '@nestjs/common';
import { IncomesRepository } from '../adapters/incomes.repository';
import { Income } from './income';

@Injectable()
export class IncomesService {
  constructor(private incomesRepository: IncomesRepository) {}

  async create(income: Income): Promise<Income> {
    return this.incomesRepository.upsert(income);
  }

  async findAll(): Promise<Income[]> {
    return this.incomesRepository.findAll();
  }

  async findById(id: string): Promise<Income> {
    return this.incomesRepository.findById(id);
  }

  async update(updatedIncome: Income) {
    const existentIncome = await this.incomesRepository.findById(
      updatedIncome.id,
    );

    return this.incomesRepository.upsert(
      existentIncome.updateBasedOnIncome(updatedIncome),
    );
  }
}
