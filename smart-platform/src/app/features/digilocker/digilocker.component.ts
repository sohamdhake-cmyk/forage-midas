import { Component, OnInit } from '@angular/core';
import { BackendApiService, DigiLockerDocument } from '../../core/backend-api.service';

@Component({
  selector: 'app-digilocker',
  templateUrl: './digilocker.component.html',
  styleUrls: ['./digilocker.component.scss']
})
export class DigilockerComponent implements OnInit {
  documents: DigiLockerDocument[] = [];
  errorMessage = '';

  constructor(private readonly api: BackendApiService) {}

  ngOnInit(): void {
    this.loadDocuments();
  }

  toggleLink(document: DigiLockerDocument): void {
    this.api.toggleDocument(document.name).subscribe({
      next: (docs) => {
        this.documents = docs;
      },
      error: () => {
        this.errorMessage = 'Could not update DigiLocker status.';
      }
    });
  }

  private loadDocuments(): void {
    this.api.getDocuments().subscribe({
      next: (docs) => {
        this.documents = docs;
      },
      error: () => {
        this.errorMessage = 'Could not load DigiLocker documents.';
      }
    });
  }
}
