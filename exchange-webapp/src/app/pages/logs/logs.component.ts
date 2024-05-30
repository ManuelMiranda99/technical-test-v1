import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { LogsService } from '../../service/logs/logs.service';
import { Logs } from '../../interface/logs.interface';

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent implements OnInit {
  logs = signal<Logs[]>([]);

  constructor(private readonly logsService: LogsService) {}

  ngOnInit(): void {
    this.logsService.getLogs().subscribe({
      next: (logs) => {
        this.logs.set(logs);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
