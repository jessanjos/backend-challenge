import { Income } from '../domain/income';

export class IncomeDto {
  description: string;
  value: number;
  date: Date;

  constructor(description: string, value: number, date: Date) {
    this.description = description;
    this.value = value;
    this.date = date;
  }

  static from(income: Income): IncomeDto {
    return new IncomeDto(income.description, income.value, income.date);
  }

  toIncome(): Income {
    return new Income({
      description: this.description,
      value: this.value,
      date: this.date,
    });
  }
}
