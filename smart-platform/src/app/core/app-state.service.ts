import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  fullName: string;
  email: string;
}

export interface QuestionnaireData {
  fullName: string;
  panNumber: string;
  annualSalary: number;
  otherIncome: number;
  section80C: number;
  section80D: number;
  tdsPaid: number;
  advanceTax: number;
}

export interface DigiLockerDocument {
  name: string;
  linked: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly userSubject = new BehaviorSubject<UserProfile>({
    fullName: 'Guest User',
    email: 'guest@smartitr.com'
  });

  private readonly questionnaireSubject = new BehaviorSubject<QuestionnaireData>({
    fullName: '',
    panNumber: '',
    annualSalary: 0,
    otherIncome: 0,
    section80C: 0,
    section80D: 0,
    tdsPaid: 0,
    advanceTax: 0
  });

  private readonly documentsSubject = new BehaviorSubject<DigiLockerDocument[]>([
    { name: 'PAN card', linked: false },
    { name: 'Aadhaar card', linked: false },
    { name: 'Form 16', linked: false },
    { name: 'Bank statement', linked: false }
  ]);

  readonly user$ = this.userSubject.asObservable();
  readonly questionnaire$ = this.questionnaireSubject.asObservable();
  readonly documents$ = this.documentsSubject.asObservable();

  get questionnaireSnapshot(): QuestionnaireData {
    return this.questionnaireSubject.value;
  }

  get userSnapshot(): UserProfile {
    return this.userSubject.value;
  }

  get documentsSnapshot(): DigiLockerDocument[] {
    return this.documentsSubject.value;
  }

  updateUser(profile: UserProfile): void {
    this.userSubject.next(profile);
  }

  saveQuestionnaire(data: QuestionnaireData): void {
    this.questionnaireSubject.next(data);
  }

  toggleDocument(name: string): void {
    const updated = this.documentsSubject.value.map((doc) =>
      doc.name === name ? { ...doc, linked: !doc.linked } : doc
    );
    this.documentsSubject.next(updated);
  }
}
