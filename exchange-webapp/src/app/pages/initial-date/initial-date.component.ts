import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ExchangeRatesService } from '../../service/exchange-rates/exchange-rates.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { RateInitial } from '../../interface';

@Component({
  selector: 'app-initial-date',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './initial-date.component.html',
  styleUrl: './initial-date.component.scss',
})
export class InitialDateComponent {
  initialDateResponse = signal<RateInitial[]>([]);

  initialDateValue = signal(new Date());

  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      this.initialDateValue.set(event.value);
    }
  }

  getExchangeByInitialDate() {
    const initialDate = this.formatDate(this.initialDateValue());

    this.exchangeRatesService.getExchangeByInitialDate(initialDate).subscribe({
      next: (response) => {
        this.initialDateResponse.set(response);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  private formatDate(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }
}
