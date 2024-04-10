import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-job-delete-modal',
  templateUrl: './job-delete-modal.component.html',
  styleUrls: ['./job-delete-modal.component.css']
})
export class JobDeleteModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
