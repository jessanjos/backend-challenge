import { Module } from '@nestjs/common';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [IncomesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
