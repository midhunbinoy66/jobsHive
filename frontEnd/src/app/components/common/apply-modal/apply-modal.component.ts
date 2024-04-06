import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.css']
})
export class ApplyModalComponent {
  coverLetter: string='';

  constructor(public dialogRef: MatDialogRef<ApplyModalComponent>) {}

  apply() {
    
    this.dialogRef.close(this.coverLetter);
    
  }
}
