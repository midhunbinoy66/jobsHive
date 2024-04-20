import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-wallet-amount-validation',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './wallet-amount-validation.component.html',
  styleUrls: ['./wallet-amount-validation.component.css']
})
export class WalletAmountValidationComponent {


  @Input()isSubmitted = false;
  @Input() amountConrol:AbstractControl| null = null;


}
