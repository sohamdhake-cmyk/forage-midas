import { Component } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { AppStateService } from '../../core/app-state.service';

interface DashboardCard {
  title: string;
  value: string;
  tone: 'primary' | 'success' | 'warning';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  readonly vm$ = combineLatest([
    this.appState.user$,
    this.appState.questionnaire$,
    this.appState.documents$
  ]).pipe(
    map(([user, questionnaire, documents]) => {
      const linkedCount = documents.filter((doc) => doc.linked).length;
      const questionnaireStarted = questionnaire.fullName.length > 0;
      const progress = questionnaireStarted ? 'Step 5/5' : 'Step 1/5';
      const completion = questionnaireStarted ? '96%' : '35%';

      const cards: DashboardCard[] = [
        { title: 'Profile Completion', value: completion, tone: 'primary' },
        { title: 'ITR Progress', value: progress, tone: 'success' },
        { title: 'Linked Documents', value: `${linkedCount}`, tone: 'warning' }
      ];

      return {
        userName: user.fullName,
        cards,
        tip: linkedCount === 0 ? 'Link Form 16 in DigiLocker to auto-fill salary details.' : 'Great! Continue filing with your linked documents.'
      };
    })
  );

  constructor(private readonly appState: AppStateService) {}
}
