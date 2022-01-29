export class Income {
  readonly id: string;
  readonly description: string;
  readonly value: number;
  readonly date: Date;

  constructor(income: {
    id?: string;
    description: string;
    value: number;
    date: Date;
  }) {
    this.id = income.id;
    this.description = income.description;
    this.value = income.value;
    this.date = income.date;
  }
}
