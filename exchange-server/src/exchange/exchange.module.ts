import { Module } from '@nestjs/common';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { SoapModule } from 'nestjs-soap';

@Module({
  controllers: [ExchangeController],
  providers: [ExchangeService],
  imports: [
    SoapModule.forRoot({
      clientName: 'TipoCambio',
      uri: 'https://www.banguat.gob.gt/variables/ws/TipoCambio.asmx?WSDL',
    }),
  ],
})
export class ExchangeModule {}
