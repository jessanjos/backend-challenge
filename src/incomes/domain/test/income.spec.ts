import BusinessException from '../../../exceptions/business.exception';
import { Income } from '../income';

describe('Income', () => {
  describe('updateBasedOnIncome', () => {
    it('return updated income with given values', () => {
      const income = new Income({
        id: 'incomeId',
        description: 'Base salary',
        value: 15000,
        date: new Date(2021, 5, 7),
      });

      expect(
        income.updateBasedOnIncome(
          new Income({
            id: 'incomeId',
            description: 'Base salary',
            value: 170000,
            date: new Date(2022, 3, 4),
          }),
        ),
      ).toMatchObject({
        id: 'incomeId',
        description: 'Base salary',
        value: 170000,
        date: new Date(2022, 3, 4),
      });
    });

    it.each([undefined, null])(
      'throw exception when given income has id as %s',
      (id) => {
        const income = new Income({
          id: 'incomeId',
          description: 'Base salary',
          value: 15000,
          date: new Date(2021, 5, 7),
        });

        expect(() =>
          income.updateBasedOnIncome(
            new Income({
              id,
              description: 'Base salary',
              value: 170000,
              date: new Date(2022, 3, 4),
            }),
          ),
        ).toThrow(
          new BusinessException(`Trying to update income with different ids`),
        );
      },
    );

    it('throw exception when given income has a different id', () => {
      const income = new Income({
        id: 'incomeId',
        description: 'Base salary',
        value: 15000,
        date: new Date(2021, 5, 7),
      });

      expect(() =>
        income.updateBasedOnIncome(
          new Income({
            id: 'differentId',
            description: 'Base salary',
            value: 170000,
            date: new Date(2022, 3, 4),
          }),
        ),
      ).toThrow(
        new BusinessException(`Trying to update income with different ids`),
      );
    });
  });
});
