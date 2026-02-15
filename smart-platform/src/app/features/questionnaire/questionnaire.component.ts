import { Component } from '@angular/core';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  readonly steps = [
    'Personal details',
    'Income details',
    'Deductions',
    'Tax paid',
    'Review declarations'
  ];
}
