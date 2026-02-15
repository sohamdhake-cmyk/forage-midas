import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { QuestionnaireComponent } from './questionnaire.component';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [CommonModule, ReactiveFormsModule, QuestionnaireRoutingModule]
})
export class QuestionnaireModule {}
