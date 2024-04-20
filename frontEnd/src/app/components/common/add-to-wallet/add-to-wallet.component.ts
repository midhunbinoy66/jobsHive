import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { validateByTrimming } from 'src/app/helpers/validations';
import { walletAmountValidators } from 'src/app/shared/validators';

@Component({
  selector: 'app-add-to-wallet',
  templateUrl: './add-to-wallet.component.html',
  styleUrls: ['./add-to-wallet.component.css']
})
export class AddToWalletComponent implements OnInit {

  isSubmitted = false;
  amountSetByCode = false
  form!:FormGroup

  constructor(
    public activeModal:NgbActiveModal,
    private readonly formBuilder:FormBuilder
  ){}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      amount:['',validateByTrimming(walletAmountValidators)]
    })
  }


  onSubmit(){
    this.isSubmitted = true;
    if(this.form.valid && !this.amountSetByCode){
      const amountData = this.form.value;
      this.activeModal.close(amountData);
    }else{
      console.log('wallet form erros', this.form.controls['amount'].errors);
    }
  }

  fillAmount(amount:number){
    this.amountSetByCode =true
    this.form.get('amount')?.setValue(String(amount));

  }

  onClickAdd (): void {
    this.amountSetByCode = false
  }
  
  onCancel (): void {
    this.activeModal.dismiss('cancel')
  }
}
