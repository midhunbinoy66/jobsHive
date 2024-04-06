import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-common-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './common-validation.component.html',
  styleUrls: ['./common-validation.component.css']
})
export class CommonValidationComponent {
 @Input() generalControl:AbstractControl | null = null
 @Input() isSubmitted:boolean =false
}
