import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get()
  async findAllIncomes() {
    const incomes = await this.incomesService.findAll();
    return { incomes: incomes.map((income) => IncomeDto.from(income)) };
  }

  @Get(':id')
  async findIncomeById(@Param('id') id: string) {
    const income = await this.incomesService.findById(id);
    return IncomeDto.from(income);
  }
}
