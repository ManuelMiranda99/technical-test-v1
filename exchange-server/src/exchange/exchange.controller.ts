import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { CompareRatesByInitialDateDto, CompareRatesDto } from './dto';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('variables')
  getAvailableVariables() {
    return this.exchangeService.getAvailableVariables();
  }

  @Post('compare-rates')
  compareRates(@Body() compareRatesDto: CompareRatesDto) {
    return this.exchangeService.compareRates(compareRatesDto);
  }

  @Post('compare-rates-initial-date')
  getCompareRatesInitialDate(
    @Body() compareRatesByInitialDateDto: CompareRatesByInitialDateDto,
  ) {
    return this.exchangeService.getRatesByInitialDate(
      compareRatesByInitialDateDto,
    );
  }
}
