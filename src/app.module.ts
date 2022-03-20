import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: globalThis.ENV_FILE || 'environments/.env',
    }),
    TypeOrmModule.forRoot(),
    IncomesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
