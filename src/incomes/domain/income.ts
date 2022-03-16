import BusinessException from '../../exceptions/business.exception';

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

  updateBasedOnIncome(income: Income) {
    if (!income.id || income.id !== this.id) {
      throw new BusinessException(`Trying to update income with different ids`);
    }

    return new Income({
      id: this.id,
      description: this.getCorrectValue(this.description, income.description),
      value: this.getCorrectValue(this.value, income.value),
      date: this.getCorrectValue(this.date, income.date),
    });
  }

  private getCorrectValue(currentValue, updatedValue) {
    return updatedValue === null ? currentValue : updatedValue;
  }
}
