import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DigilockerComponent } from './digilocker.component';

const routes: Routes = [{ path: '', component: DigilockerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DigilockerRoutingModule {}
