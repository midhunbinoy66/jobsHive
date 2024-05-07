import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.css']
})
export class ApplyModalComponent {
  coverLetter: string='';
  selectedFile: File | null = null;

 

  constructor(public dialogRef: MatDialogRef<ApplyModalComponent>) {}

  apply() {
    this.dialogRef.close({ coverLetter: this.coverLetter, file: this.selectedFile });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log('Selected file:', this.selectedFile);
  }
  
}
