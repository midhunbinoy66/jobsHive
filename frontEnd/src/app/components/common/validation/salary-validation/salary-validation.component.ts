import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-salary-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './salary-validation.component.html',
  styleUrls: ['./salary-validation.component.css']
})
export class SalaryValidationComponent {

  @Input() salaryContorl:AbstractControl | null = null;
  @Input() isSubmitted:boolean  =false;

  constructor(){
    console.log(this.salaryContorl);
  }
}
