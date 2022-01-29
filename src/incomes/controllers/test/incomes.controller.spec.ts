import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
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
      IncomesServiceMock.prototype.create.mockResolvedValue({
        description: 'Target',
        value: 11.9,
        date: today,
      });

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
          expect(result.body.description).toEqual('Target');
          expect(result.body.value).toEqual(11.9);
          expect(result.body.date).toEqual(today.toISOString());
        });
    });
  });

  describe('GET /incomes', () => {
    it('should return all income', () => {
      IncomesServiceMock.prototype.findAll.mockResolvedValue([
        {
          description: 'Target',
          value: 11.9,
          date: today,
        },
      ]);

      return request(app.getHttpServer())
        .get('/incomes')
        .then((result) => {
          expect(result.status).toEqual(200);
          expect(result.body.incomes[0].description).toEqual('Target');
          expect(result.body.incomes[0].value).toEqual(11.9);
          expect(result.body.incomes[0].date).toEqual(today.toISOString());
        });
    });
  });
});
