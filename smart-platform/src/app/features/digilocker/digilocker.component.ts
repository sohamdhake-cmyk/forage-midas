import { Component } from '@angular/core';

@Component({
  selector: 'app-digilocker',
  templateUrl: './digilocker.component.html',
  styleUrls: ['./digilocker.component.scss']
})
export class DigilockerComponent {
  readonly documents = ['PAN card', 'Aadhaar card', 'Form 16', 'Bank statement'];
}
