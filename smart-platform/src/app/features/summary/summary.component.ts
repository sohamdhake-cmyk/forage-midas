import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AppStateService } from '../../core/app-state.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  readonly vm$ = combineLatest([this.appState.user$, this.appState.questionnaire$]).pipe(
    map(([user, q]) => {
      const grossIncome = q.annualSalary + q.otherIncome;
      const totalDeductions = q.section80C + q.section80D;
      const taxableIncome = Math.max(grossIncome - totalDeductions, 0);
      const estimatedTax = Math.max(Math.round(taxableIncome * 0.1 - (q.tdsPaid + q.advanceTax)), 0);

      return {
        userName: user.fullName,
        hasData: grossIncome > 0 || totalDeductions > 0,
        items: [
          { label: 'Gross Income', value: this.formatCurrency(grossIncome) },
          { label: 'Total Deductions', value: this.formatCurrency(totalDeductions) },
          { label: 'Taxable Income', value: this.formatCurrency(taxableIncome) },
          { label: 'Estimated Tax Due', value: this.formatCurrency(estimatedTax) }
        ]
      };
    })
  );

  constructor(private readonly appState: AppStateService) {}

  private formatCurrency(value: number): string {
    return `₹${value.toLocaleString('en-IN')}`;
  }
}
