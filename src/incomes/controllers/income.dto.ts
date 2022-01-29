import { Income } from '../domain/income';

export class IncomeDto {
  id: string;
  description: string;
  value: number;
  date: Date;

  constructor(description: string, value: number, date: Date, id?: string) {
    this.description = description;
    this.value = value;
    this.date = date;
    this.id = id;
  }

  static from(income: Income): IncomeDto {
    return new IncomeDto(
      income.description,
      income.value,
      income.date,
      income.id,
    );
  }

  toIncome(): Income {
    return new Income({
      description: this.description,
      value: this.value,
      date: this.date,
      id: this.id,
    });
  }
}
