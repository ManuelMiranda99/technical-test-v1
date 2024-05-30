import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logs } from '../../interface/logs.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  constructor(private readonly httpClient: HttpClient) {}

  getLogs() {
    return this.httpClient
      .get<Logs[]>('http://localhost:3000/exchange/logs')
      .pipe(tap((logs) => console.log(logs)));
  }
}
