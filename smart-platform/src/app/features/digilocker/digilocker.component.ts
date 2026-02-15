import { Component } from '@angular/core';
import { AppStateService, DigiLockerDocument } from '../../core/app-state.service';

@Component({
  selector: 'app-digilocker',
  templateUrl: './digilocker.component.html',
  styleUrls: ['./digilocker.component.scss']
})
export class DigilockerComponent {
  readonly documents$ = this.appState.documents$;

  constructor(private readonly appState: AppStateService) {}

  toggleLink(document: DigiLockerDocument): void {
    this.appState.toggleDocument(document.name);
  }
}
