import { Inject, Injectable } from '@nestjs/common';
import { Client as SoapClient } from 'nestjs-soap';
import { CompareRatesByInitialDateDto, CompareRatesDto } from './dto';

@Injectable()
export class ExchangeService {
  constructor(@Inject('TipoCambio') private readonly soapClient: SoapClient) {}

  getAvailableVariables() {
    return this.soapClient.VariablesDisponiblesAsync();
  }

  compareRates(compareRatesDto: CompareRatesDto) {
    // SAVE ON DB

    const formattedInitialDate = this.transformDate(compareRatesDto.fechainit);
    const formattedEndDate = this.transformDate(compareRatesDto.fechafin);

    console.log('formattedInitialDate', formattedInitialDate);
    console.log('formattedEndDate', formattedEndDate);

    return this.soapClient.TipoCambioRangoAsync({
      fechainit: formattedInitialDate,
      fechafin: formattedEndDate,
    });
  }

  getRatesByInitialDate(initialDate: CompareRatesByInitialDateDto) {
    const formattedInitialDate = this.transformDate(initialDate.fechainit);
    console.log('formattedInitialDate', formattedInitialDate);
    return this.soapClient.TipoCambioFechaInicialAsync({
      fechainit: formattedInitialDate,
    });
  }

  private transformDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
