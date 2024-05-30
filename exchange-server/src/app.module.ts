import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequest } from './exchange/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      entities: [LogRequest],
      database: 'exchange-db',
      synchronize: true,
      logging: true,
    }),
    ExchangeModule,
  ],
})
export class AppModule {}
