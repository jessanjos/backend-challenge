export class Income {
  readonly description: string;
  readonly value: number;
  readonly date: Date;

  constructor(income: { description: string; value: number; date: Date }) {
    this.description = income.description;
    this.value = income.value;
    this.date = income.date;
  }
}
