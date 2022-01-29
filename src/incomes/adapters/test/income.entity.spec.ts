import { Income } from '../../domain/income';
import { IncomeEntity } from '../income.entity';

describe('IncomeEntity', () => {
  const today = new Date();

  describe('from', () => {
    it('return income entity from income', () => {
      const income = new Income({
        description: 'Target',
        value: 11.9,
        date: today,
      });

      expect(IncomeEntity.from(income)).toMatchObject({
        description: 'Target',
        value: 11.9,
        date: today,
      });
    });
  });

  describe('toIncome', () => {
    it('return income from entity', () => {
      const entity = new IncomeEntity('Target', 11.9, today);

      expect(entity.toIncome()).toMatchObject({
        description: 'Target',
        value: 11.9,
        date: today,
      });
    });
  });
});
