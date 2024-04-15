import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-job-status-modal',
  templateUrl: './update-job-status-modal.component.html',
  styleUrls: ['./update-job-status-modal.component.css']
})
export class UpdateJobStatusModalComponent {
  selectedStatus: string=''; 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef: MatDialogRef<UpdateJobStatusModalComponent>
  ){}

  updateStatus() {
    // When "Update" button is clicked, pass the selected status back to the parent
    this.dialogRef.close(this.selectedStatus);
  }
}
