import { Component, OnInit } from '@angular/core';
import { BackendApiService, DashboardResponse } from '../../core/backend-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  vm: DashboardResponse | null = null;
  errorMessage = '';

  constructor(private readonly api: BackendApiService) {}

  ngOnInit(): void {
    this.api.getDashboard().subscribe({
      next: (response) => {
        this.vm = response;
      },
      error: () => {
        this.errorMessage = 'Could not load dashboard from backend.';
      }
    });
  }
}
