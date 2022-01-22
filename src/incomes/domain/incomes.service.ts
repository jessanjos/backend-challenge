import { Injectable, NotImplementedException } from '@nestjs/common';
import { Income } from './income';

@Injectable()
export class IncomesService {
  async create(income: Income): Promise<Income> {
    throw NotImplementedException;
  }
}
