import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'landing' },
  {
    path: 'landing',
    loadChildren: () => import('./features/landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'questionnaire',
    loadChildren: () =>
      import('./features/questionnaire/questionnaire.module').then((m) => m.QuestionnaireModule)
  },
  {
    path: 'digilocker',
    loadChildren: () =>
      import('./features/digilocker/digilocker.module').then((m) => m.DigilockerModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./features/summary/summary.module').then((m) => m.SummaryModule)
  },
  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
