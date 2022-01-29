import { Income } from '../../domain/income';
import { IncomeDto } from '../income.dto';

describe('IncomeDto', () => {
  const today = new Date();

  describe('from', () => {
    it('should return new incomeDto from income', () => {
      const income = new Income({
        id: 'incomeId',
        description: 'Target',
        value: 11.9,
        date: today,
      });

      expect(IncomeDto.from(income)).toMatchObject({
        id: 'incomeId',
        description: 'Target',
        value: 11.9,
        date: today,
      });
    });
  });

  describe('toIncome', () => {
    it('should return new income from incomeDto', () => {
      const dto = new IncomeDto('Target', 11.9, today, 'incomeId');

      expect(dto.toIncome()).toMatchObject({
        id: 'incomeId',
        description: 'Target',
        value: 11.9,
        date: today,
      });
    });
  });
});
