import { Injectable, NotImplementedException } from '@nestjs/common';
import { Income } from '../domain/income';

@Injectable()
export class IncomesRepository {
  async upsert(income: Income): Promise<Income> {
    throw NotImplementedException;
  }
}
