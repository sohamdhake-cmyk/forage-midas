import { Component, OnInit } from '@angular/core';
import { BackendApiService, SummaryResponse } from '../../core/backend-api.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  vm: SummaryResponse | null = null;
  errorMessage = '';

  constructor(private readonly api: BackendApiService) {}

  ngOnInit(): void {
    this.api.getSummary().subscribe({
      next: (response) => {
        this.vm = response;
      },
      error: () => {
        this.errorMessage = 'Could not load summary from backend.';
      }
    });
  }

  formatCurrency(value: number): string {
    return `₹${value.toLocaleString('en-IN')}`;
  }
}
