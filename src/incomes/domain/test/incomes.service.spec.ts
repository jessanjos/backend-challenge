import { NotFoundException } from '@nestjs/common';
import { IncomesRepository } from '../../adapters/incomes.repository';
import { Income } from '../income';
import { IncomesService } from '../incomes.service';

describe('IncomesService', () => {
  let service: IncomesService;
  let incomesRepository;

  const today = new Date();

  beforeEach(async () => {
    incomesRepository = new IncomesRepository();
    service = new IncomesService(incomesRepository);
  });

  describe('create', () => {
    it('should return created income', async () => {
      const newIncome = new Income({
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.upsert = jest.fn().mockResolvedValue(newIncome);

      expect(await service.create(newIncome)).toMatchObject({
        description: 'income',
        value: 100,
        date: today,
      });
    });

    it('should throw exception when there was an error to save income', async () => {
      const newIncome = new Income({
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.upsert = jest
        .fn()
        .mockRejectedValue(new Error('There was an error to create income'));

      await expect(service.create(newIncome)).rejects.toThrow(
        new Error(`There was an error to create income`),
      );
    });
  });

  describe('findAll', () => {
    it('should return incomes', async () => {
      const income = new Income({
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.findAll = jest.fn().mockResolvedValue([income]);

      expect(await service.findAll()).toMatchObject([
        {
          description: 'income',
          value: 100,
          date: today,
        },
      ]);
    });
  });

  describe('findById', () => {
    it('should return income with given id', async () => {
      const income = new Income({
        id: 'incomeId',
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.findById = jest.fn().mockResolvedValue(income);

      expect(await service.findById('incomeId')).toMatchObject({
        id: 'incomeId',
        description: 'income',
        value: 100,
        date: today,
      });
    });

    it('should throw exception when there is no income with given id', async () => {
      incomesRepository.findById = jest
        .fn()
        .mockRejectedValue(
          new NotFoundException('It was not found an income for given id'),
        );

      await expect(service.findById('incomeId')).rejects.toThrow(
        new NotFoundException(`It was not found an income for given id`),
      );
    });
  });

  describe('update', () => {
    beforeEach(() => {
      incomesRepository.upsert = jest
        .fn()
        .mockImplementation((income) => income);
    });

    it('should return updated income', async () => {
      const income = new Income({
        id: 'incomeId',
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.findById = jest.fn().mockResolvedValue(income);

      expect(
        await service.update(
          new Income({
            id: 'incomeId',
            description: 'income',
            value: 500,
            date: today,
          }),
        ),
      ).toMatchObject({
        id: 'incomeId',
        description: 'income',
        value: 500,
        date: today,
      });
    });

    it('should throw exception when there is no income with given id', async () => {
      incomesRepository.findById = jest
        .fn()
        .mockRejectedValue(
          new NotFoundException('It was not found an income for given id'),
        );

      await expect(
        service.update(
          new Income({
            id: 'incomeId',
            description: 'income',
            value: 500,
            date: today,
          }),
        ),
      ).rejects.toThrow(
        new NotFoundException(`It was not found an income for given id`),
      );
    });

    it('should throw exception when there was a problem to save updated income', async () => {
      const income = new Income({
        id: 'incomeId',
        description: 'income',
        value: 100,
        date: today,
      });

      incomesRepository.findById = jest.fn().mockResolvedValue(income);
      incomesRepository.findById = jest.fn().mockRejectedValue(new Error());

      await expect(
        service.update(
          new Income({
            id: 'incomeId',
            description: 'income',
            value: 500,
            date: today,
          }),
        ),
      ).rejects.toThrow(new Error());
    });
  });
});
