import { Body, Controller, Post } from '@nestjs/common';
import { IncomesService } from '../domain/incomes.service';
import { IncomeDto } from './income.dto';

@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}
  @Post()
  async createIncome(@Body() incomeDto: IncomeDto) {
    const income = await this.incomesService.create(incomeDto.toIncome());
    return IncomeDto.from(income);
  }
}
