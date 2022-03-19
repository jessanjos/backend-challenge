import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import BusinessException from '../../../exceptions/business.exception';
import { Income } from '../../domain/income';
import { IncomesService } from '../../domain/incomes.service';
import { IncomesController } from '../incomes.controller';

jest.mock('../../domain/incomes.service');

describe('IncomesController', () => {
  let app: INestApplication;
  const IncomesServiceMock = IncomesService as jest.MockedClass<
    typeof IncomesService
  >;

  const today = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IncomesService],
      controllers: [IncomesController],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  describe('POST /incomes', () => {
    it('should return created income', () => {
      IncomesServiceMock.prototype.create.mockResolvedValue(
        new Income({
          id: 'incomeId',
          description: 'Target',
          value: 11.9,
          date: today,
        }),
      );

      const givenBody = {
        description: 'Target',
        value: 11.9,
        date: today,
      };

      return request(app.getHttpServer())
        .post('/incomes')
        .send(givenBody)
        .then((result) => {
          expect(result.status).toEqual(201);
          expect(result.body.id).toEqual('incomeId');
          expect(result.body.description).toEqual('Target');
          expect(result.body.value).toEqual(11.9);
          expect(result.body.date).toEqual(today.toISOString());
        });
    });

    it('should return unprocessable entity when it is a duplicated income', () => {
      IncomesServiceMock.prototype.create.mockRejectedValue(
        new BusinessException(
          `An income with description Target and 2022-01-20 already exists`,
        ),
      );

      const givenBody = {
        description: 'Target',
        value: 11.9,
        date: today,
      };

      return request(app.getHttpServer())
        .post('/incomes')
        .send(givenBody)
        .then((result) => {
          expect(result.status).toEqual(422);
          expect(result.body.message).toEqual(
            `An income with description Target and 2022-01-20 already exists`,
          );
          expect(result.body.error).toEqual('Unprocessable Entity');
        });
    });
  });

  describe('GET /incomes', () => {
    it('should return all income', () => {
      IncomesServiceMock.prototype.findAll.mockResolvedValue([
        new Income({
          id: 'incomeId',
          description: 'Target',
          value: 11.9,
          date: today,
        }),
      ]);

      return request(app.getHttpServer())
        .get('/incomes')
        .then((result) => {
          expect(result.status).toEqual(200);
          expect(result.body.incomes[0].id).toEqual('incomeId');
          expect(result.body.incomes[0].description).toEqual('Target');
          expect(result.body.incomes[0].value).toEqual(11.9);
          expect(result.body.incomes[0].date).toEqual(today.toISOString());
        });
    });
  });

  describe('GET /incomes/{id}', () => {
    it('should return income with given id', () => {
      IncomesServiceMock.prototype.findById.mockResolvedValue(
        new Income({
          id: 'incomeId',
          description: 'Target',
          value: 11.9,
          date: today,
        }),
      );

      return request(app.getHttpServer())
        .get('/incomes/incomeId')
        .then((result) => {
          expect(result.status).toEqual(200);
          expect(result.body.id).toEqual('incomeId');
          expect(result.body.description).toEqual('Target');
          expect(result.body.value).toEqual(11.9);
          expect(result.body.date).toEqual(today.toISOString());
        });
    });

    it('should return 404 when was not found an income with id', () => {
      IncomesServiceMock.prototype.findById.mockRejectedValue(
        new NotFoundException('There is no income with given id'),
      );

      return request(app.getHttpServer())
        .get('/incomes/incomeId')
        .then((result) => {
          expect(result.status).toEqual(404);
        });
    });
  });

  describe('PUT /incomes/{id}', () => {
    it('should return updated income', () => {
      IncomesServiceMock.prototype.update.mockResolvedValue(
        new Income({
          id: 'incomeId',
          description: 'Target',
          value: 11.9,
          date: today,
        }),
      );

      const givenBody = {
        description: 'Target',
        value: 11.9,
        date: today,
      };

      return request(app.getHttpServer())
        .put('/incomes/incomeId')
        .send(givenBody)
        .then((result) => {
          expect(result.status).toEqual(200);
          expect(result.body.id).toEqual('incomeId');
          expect(result.body.description).toEqual('Target');
          expect(result.body.value).toEqual(11.9);
          expect(result.body.date).toEqual(today.toISOString());
        });
    });

    it('should return unprocessable entity when some error happens on udate', () => {
      IncomesServiceMock.prototype.update.mockRejectedValue(
        new BusinessException(`Income with given id does not exist`),
      );

      const givenBody = {
        description: 'Target',
        value: 11.9,
        date: today,
      };

      return request(app.getHttpServer())
        .put('/incomes/unexistentIncomeId')
        .send(givenBody)
        .then((result) => {
          expect(result.status).toEqual(422);
          expect(result.body.message).toEqual(
            `Income with given id does not exist`,
          );
          expect(result.body.error).toEqual('Unprocessable Entity');
        });
    });
  });
});
