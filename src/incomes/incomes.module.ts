import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomesRepository } from './adapters/incomes.repository';
import { IncomesController } from './controllers/incomes.controller';
import { IncomesService } from './domain/incomes.service';

@Module({
  imports: [TypeOrmModule.forFeature([IncomesRepository])],
  controllers: [IncomesController],
  providers: [IncomesService],
})
export class IncomesModule {}
