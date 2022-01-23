import { Injectable } from '@nestjs/common';
import { IncomesRepository } from '../adapters/incomes.repository';
import { Income } from './income';

@Injectable()
export class IncomesService {
  constructor(private readonly incomesRepository: IncomesRepository) {}

  async create(income: Income): Promise<Income> {
    return this.incomesRepository.upsert(income);
  }
}
