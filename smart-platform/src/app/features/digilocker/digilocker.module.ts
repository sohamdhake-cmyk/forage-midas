import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DigilockerRoutingModule } from './digilocker-routing.module';
import { DigilockerComponent } from './digilocker.component';

@NgModule({
  declarations: [DigilockerComponent],
  imports: [CommonModule, DigilockerRoutingModule]
})
export class DigilockerModule {}
