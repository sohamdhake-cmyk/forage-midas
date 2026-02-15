import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  readonly cards = [
    { title: 'Profile Completion', value: '78%', tone: 'primary' },
    { title: 'ITR Progress', value: 'Step 3/6', tone: 'success' },
    { title: 'Pending Actions', value: '2', tone: 'warning' }
  ];
}
