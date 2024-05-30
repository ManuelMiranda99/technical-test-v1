import { Inject, Injectable } from '@nestjs/common';
import { Client as SoapClient } from 'nestjs-soap';
import { CompareRatesByInitialDateDto, CompareRatesDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LogRequest } from '../entities';
import { Repository } from 'typeorm';
import {
  ExchangeCompareRatesReponse,
  Rates,
  Root2,
} from '../../interface/exchange-compare-rates-response.interface';

@Injectable()
export class ExchangeService {
  constructor(
    @Inject('TipoCambio') private readonly soapClient: SoapClient,
    @InjectRepository(LogRequest)
    private readonly logRequestRepository: Repository<LogRequest>,
  ) {}

  getAvailableVariables() {
    return this.soapClient.VariablesDisponiblesAsync();
  }

  async compareRates(compareRatesDto: CompareRatesDto) {
    const formattedInitialDate = this.transformDate(compareRatesDto.fechainit);
    const formattedEndDate = this.transformDate(compareRatesDto.fechafin);

    const soapResponse = (await this.soapClient.TipoCambioRangoAsync({
      fechainit: formattedInitialDate,
      fechafin: formattedEndDate,
    })) as ExchangeCompareRatesReponse;

    const ratesToCompare = this.getRatesToCompare(soapResponse[0]);

    this.saveLogRequest(compareRatesDto, ratesToCompare);

    return soapResponse;
  }

  private getRatesToCompare(responseRoot: Root2) {
    const {
      TipoCambioRangoResult: {
        Vars: { Var: rates },
      },
    } = responseRoot;

    return [rates[0], rates[rates.length - 1]];
  }

  private saveLogRequest(dates: CompareRatesDto, ratesToCompare: Rates[]) {
    const logRequest = new LogRequest();
    logRequest.initialDate = dates.fechainit;
    logRequest.initialPurchaseRate = ratesToCompare[0].compra;
    logRequest.initialSaleRate = ratesToCompare[0].venta;

    logRequest.finalDate = dates.fechafin;
    logRequest.finalPurchaseRate = ratesToCompare[1].compra;
    logRequest.finalSaleRate = ratesToCompare[1].venta;

    this.logRequestRepository.save(logRequest);
  }

  getRatesByInitialDate(initialDate: CompareRatesByInitialDateDto) {
    const formattedInitialDate = this.transformDate(initialDate.fechainit);

    return this.soapClient.TipoCambioFechaInicialAsync({
      fechainit: formattedInitialDate,
    });
  }

  private transformDate(date: Date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  getLogs() {
    return this.logRequestRepository.find();
  }
}
