import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Rate, Root, RootInitial } from '../../interface';
import { AverageExchanges } from '../../interface/average.interface';

@Injectable({
  providedIn: 'root',
})
export class ExchangeRatesService {
  constructor(private readonly httpClient: HttpClient) {}

  compareDates(
    initialDate: string,
    finalDate: string
  ): Observable<AverageExchanges> {
    return this.httpClient
      .post<Root>('http://localhost:3000/exchange/compare-rates', {
        fechainit: initialDate,
        fechafin: finalDate,
      })
      .pipe(
        tap((response) => {
          console.log(response);
        }),
        map((response) => {
          return response[0].TipoCambioRangoResult.Vars.Var;
        }),
        map((rates) => {
          // GET THE AVERAGE RATE FOR venta AND compra
          const ratesLength = rates.length;
          const reducedRates = rates.reduce(
            (acc, rate) => {
              acc.venta += rate.venta;
              acc.compra += rate.compra;
              return acc;
            },
            { venta: 0, compra: 0 }
          );

          return {
            venta: reducedRates.venta / ratesLength,
            compra: reducedRates.compra / ratesLength,
          };
        })
      );
  }

  getExchangeByInitialDate(initialDate: string) {
    return this.httpClient
      .post<RootInitial>(
        'http://localhost:3000/exchange/compare-rates-initial-date',
        { fechainit: initialDate }
      )
      .pipe(
        tap((response) => {
          console.log(response);
        }),
        map((response) => {
          return response[0].TipoCambioFechaInicialResult.Vars.Var;
        }),
        map((purchaseRates) => {
          return purchaseRates.sort((a, b) => b.venta - a.venta);
        })
      );
  }
}
