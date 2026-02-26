import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

export interface DashboardCard {
  title: string;
  value: string;
  tone: 'primary' | 'success' | 'warning';
}

export interface DashboardResponse {
  userName: string;
  cards: DashboardCard[];
  tip: string;
}

export interface DigiLockerDocument {
  name: string;
  linked: boolean;
}

export interface SummaryItem {
  label: string;
  value: number;
}

export interface SummaryResponse {
  userName: string;
  hasData: boolean;
  items: SummaryItem[];
}

@Injectable({ providedIn: 'root' })
export class BackendApiService {
  private readonly apiBase = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient) {}

  login(payload: { email: string; password: string }): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiBase}/auth/login`, payload);
  }

  register(payload: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${this.apiBase}/auth/register`, payload);
  }

  getQuestionnaire(): Observable<QuestionnaireData> {
    return this.http.get<QuestionnaireData>(`${this.apiBase}/questionnaire`);
  }

  saveQuestionnaire(payload: QuestionnaireData): Observable<QuestionnaireData> {
    return this.http.put<QuestionnaireData>(`${this.apiBase}/questionnaire`, payload);
  }

  getDashboard(): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.apiBase}/dashboard`);
  }

  getDocuments(): Observable<DigiLockerDocument[]> {
    return this.http.get<DigiLockerDocument[]>(`${this.apiBase}/digilocker/documents`);
  }

  toggleDocument(name: string): Observable<DigiLockerDocument[]> {
    return this.http.post<DigiLockerDocument[]>(`${this.apiBase}/digilocker/documents/${encodeURIComponent(name)}/toggle`, {});
  }

  getSummary(): Observable<SummaryResponse> {
    return this.http.get<SummaryResponse>(`${this.apiBase}/summary`);
  }
}
