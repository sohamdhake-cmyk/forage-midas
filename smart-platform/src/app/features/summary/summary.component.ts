import { Component } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  readonly items = [
    { label: 'Gross Income', value: '₹9,60,000' },
    { label: 'Total Deductions', value: '₹1,50,000' },
    { label: 'Estimated Tax', value: '₹42,300' }
  ];
}
