import { Module } from '@nestjs/common';
import { IncomesController } from './controllers/incomes.controller';
import { IncomesService } from './domain/incomes.service';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
