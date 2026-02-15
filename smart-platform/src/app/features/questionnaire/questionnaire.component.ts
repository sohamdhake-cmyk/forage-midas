import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppStateService } from '../../core/app-state.service';

type QuestionnaireControlName =
  | 'fullName'
  | 'panNumber'
  | 'annualSalary'
  | 'otherIncome'
  | 'section80C'
  | 'section80D'
  | 'tdsPaid'
  | 'advanceTax'
  | 'declarationAccepted';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss']
})
export class QuestionnaireComponent {
  currentStep = 0;
  readonly stepLabels = ['Personal', 'Income', 'Deductions', 'Tax Paid', 'Review'];

  readonly questionnaireForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    panNumber: ['', [Validators.required, Validators.pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)]],
    annualSalary: [0, [Validators.required, Validators.min(1)]],
    otherIncome: [0, [Validators.min(0)]],
    section80C: [0, [Validators.min(0)]],
    section80D: [0, [Validators.min(0)]],
    tdsPaid: [0, [Validators.required, Validators.min(0)]],
    advanceTax: [0, [Validators.min(0)]],
    declarationAccepted: [false, [Validators.requiredTrue]]
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly appState: AppStateService
  ) {
    const snapshot = this.appState.questionnaireSnapshot;
    if (snapshot.fullName) {
      this.questionnaireForm.patchValue(snapshot);
      this.questionnaireForm.controls.declarationAccepted.setValue(true);
    }
  }

  get progressPercent(): number {
    return Math.round(((this.currentStep + 1) / this.stepLabels.length) * 100);
  }

  nextStep(): void {
    if (!this.isStepValid(this.currentStep)) {
      this.markStepAsTouched(this.currentStep);
      return;
    }

    if (this.currentStep < this.stepLabels.length - 1) {
      this.currentStep += 1;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep -= 1;
    }
  }

  submitQuestionnaire(): void {
    if (!this.isStepValid(4)) {
      this.markStepAsTouched(4);
      return;
    }

    const formValue = this.questionnaireForm.getRawValue();
    this.appState.saveQuestionnaire({
      fullName: formValue.fullName,
      panNumber: formValue.panNumber,
      annualSalary: formValue.annualSalary,
      otherIncome: formValue.otherIncome,
      section80C: formValue.section80C,
      section80D: formValue.section80D,
      tdsPaid: formValue.tdsPaid,
      advanceTax: formValue.advanceTax
    });

    void this.router.navigate(['/summary']);
  }

  private isStepValid(step: number): boolean {
    const controls = this.stepControlMap[step];
    return controls.every((name) => this.questionnaireForm.controls[name].valid);
  }

  private markStepAsTouched(step: number): void {
    const controls = this.stepControlMap[step];
    controls.forEach((name) => this.questionnaireForm.controls[name].markAsTouched());
  }

  private readonly stepControlMap: QuestionnaireControlName[][] = [
    ['fullName', 'panNumber'],
    ['annualSalary', 'otherIncome'],
    ['section80C', 'section80D'],
    ['tdsPaid', 'advanceTax'],
    ['declarationAccepted']
  ];
}
