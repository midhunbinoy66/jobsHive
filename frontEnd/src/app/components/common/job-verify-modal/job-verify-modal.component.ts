import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-verify-modal',
  templateUrl: './job-verify-modal.component.html',
  styleUrls: ['./job-verify-modal.component.css']
})
export class JobVerifyModalComponent {
  verificationStatus: string=''; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<JobVerifyModalComponent>
  ){}

  updateStatus() {
    // When "Update" button is clicked, pass the selected status back to the parent
    this.dialogRef.close(this.verificationStatus);
  }
}
