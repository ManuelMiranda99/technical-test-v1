import { Module } from '@nestjs/common';
import { ExchangeController } from './controller/exchange.controller';
import { ExchangeService } from './services/exchange.service';
import { SoapModule } from 'nestjs-soap';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequest } from './entities';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService],
  imports: [
    SoapModule.forRoot({
      clientName: 'TipoCambio',
      uri: 'https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL',
    }),
    TypeOrmModule.forFeature([LogRequest]),
  ],
})
export class ExchangeModule {}
