import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-state-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './state-validation.component.html',
  styleUrls: ['./state-validation.component.css']
})
export class StateValidationComponent {
  @Input() stateControl: AbstractControl | null = null
  @Input() isSubmitted: boolean = false
}
