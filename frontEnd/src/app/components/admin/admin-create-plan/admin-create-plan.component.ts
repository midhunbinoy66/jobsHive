import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { PlanService } from 'src/app/services/plan.service';
import { commonValidators, nameValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-create-plan',
  templateUrl: './admin-create-plan.component.html',
  styleUrls: ['./admin-create-plan.component.css']
})
export class AdminCreatePlanComponent implements OnInit {

  form!:FormGroup;
  isSubmittd=false;

  constructor(
    private readonly fb:FormBuilder,
    private readonly planService:PlanService,
    private readonly router:Router

  ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['',[validateByTrimming(commonValidators)]],
      description:['',[validateByTrimming(commonValidators)]],
      price:['',[Validators.required,Validators.min(100),Validators.max(1000)]],
      features:this.fb.array([this.fb.control('',Validators.required)],Validators.required),
      duration:['',Validators.required],
      type:['user',Validators.required]
    })
  }

  get featuresForm(){
    return this.form.get('features') as FormArray
  }

  addFeature(){
    this.featuresForm.push(this.fb.control('',Validators.required))
  }

  removeFeature(index:number){
    this.featuresForm.removeAt(index);
  }

  onSubmit(){
    this.isSubmittd =true;
    if(!this.form.invalid){
      const planData = this.form.getRawValue();
      this.planService.savePlan(planData).subscribe({
        next:(res)=>{
          void Swal.fire('Success','Plan Added Succesfully','success');
          this.router.navigate(['/admin/plans'])
        }
      })

    }

  }
}
