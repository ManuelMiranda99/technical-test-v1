import { Component, signal } from '@angular/core';
import { ExchangeRatesService } from '../../service/exchange-rates/exchange-rates.service';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AverageExchanges } from '../../interface';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-compare-dates',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    DatePipe,
    CommonModule,
  ],
  templateUrl: './compare-dates.component.html',
  styleUrl: './compare-dates.component.scss',
})
export class CompareDatesComponent {
  compareDatesResponse = signal<AverageExchanges | undefined>(undefined);

  initialDateValue = signal(new Date());
  finalDateValue = signal(new Date());

  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  onDateChange(
    type: 'initialDateValue' | 'finalDateValue',
    event: MatDatepickerInputEvent<Date>
  ) {
    if (event.value) {
      this[type].set(event.value);
    }
  }

  compareDates() {
    const initialDate = this.formatDate(this.initialDateValue());
    const finalDate = this.formatDate(this.finalDateValue());

    this.exchangeRatesService.compareDates(initialDate, finalDate).subscribe({
      next: (response) => {
        this.compareDatesResponse.set(response);
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
