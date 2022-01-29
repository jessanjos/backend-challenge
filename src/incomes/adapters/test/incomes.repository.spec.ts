import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Income } from '../../domain/income';
import { IncomeEntity } from '../income.entity';
import { IncomesRepository } from '../incomes.repository';

describe('IncomeRepository', () => {
  let module: TestingModule;
  let entityManager: EntityManager;
  let repository: IncomesRepository;

  const today = new Date();

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'alura_challenge_test',
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([IncomesRepository]),
      ],
    }).compile();

    entityManager = module.get(EntityManager);
    repository = module.get(IncomesRepository);
  });

  beforeEach(async () => {
    await entityManager
      .createQueryBuilder()
      .delete()
      .from(IncomeEntity)
      .execute();
  });

  afterAll(async () => {
    await module.close();
  });

  describe('upsert', () => {
    it('should save income to DB', async () => {
      const income = new Income({
        description: 'Target',
        value: 11.9,
        date: today,
      });

      const result = await repository.upsert(income);
      expect(result).toBeInstanceOf(Income);

      const persistedIncome = await entityManager.find(IncomeEntity);
      expect(persistedIncome).toHaveLength(1);
      expect(persistedIncome[0].id).not.toBeNull();
      expect(persistedIncome[0].description).toEqual('Target');
      expect(persistedIncome[0].value).toEqual('11.90');
      expect(persistedIncome[0].date).toEqual(today);
      expect(persistedIncome[0].createdAt).not.toBeNull();
      expect(persistedIncome[0].updatedAt).not.toBeNull();
      expect(persistedIncome[0].deletedAt).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return all saved incomes', async () => {
      await entityManager.save(new IncomeEntity('Income 1', 1.5, today));
      await entityManager.save(new IncomeEntity('Income 2', 2.5, today));
      await entityManager.save(new IncomeEntity('Income 3', 3.5, today));

      const result = await repository.findAll();

      expect(result).toMatchObject([
        {
          description: 'Income 1',
          value: '1.50',
          date: today,
        },
        {
          description: 'Income 2',
          value: '2.50',
          date: today,
        },
        {
          description: 'Income 3',
          value: '3.50',
          date: today,
        },
      ]);
    });
  });
});
