import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { validateByTrimming } from 'src/app/helpers/validations';
import { IPlan } from 'src/app/models/plans';
import { PlanService } from 'src/app/services/plan.service';
import { MIN_PLAN_AMOUNT, MIN_SALARY_AMOUNT } from 'src/app/shared/constants';
import { commonValidators } from 'src/app/shared/validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-edit-plan',
  templateUrl: './admin-edit-plan.component.html',
  styleUrls: ['./admin-edit-plan.component.css']
})
export class AdminEditPlanComponent implements OnInit{

  plan:IPlan | null = null;
  form!:FormGroup;
  isSubmittd=false;
  PlanId:string ='';

  constructor(
    private readonly planService:PlanService,
    private readonly route:ActivatedRoute,
    private readonly fb:FormBuilder,
    private readonly router:Router
  ){}

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.PlanId = params['planId'];
      this.planService.findUserPlan(this.PlanId).subscribe({
        next:(res)=>{
          this.plan = res.data
          if(this.plan !== null){
            this.initializeForm();
          }
        }
      })
    })

  }

  initializeForm(){
    this.form = this.fb.group({
      name:['',[validateByTrimming(commonValidators)]],
      description:['',[validateByTrimming(commonValidators)]],
      price:['',[Validators.required,Validators.min(MIN_PLAN_AMOUNT)]],
      duration:['',[Validators.required,Validators.min(2)]],
      type:['',Validators.required],
      // features:this.fb.array([],Validators.required)
      features:this.fb.group({
        jobApplications:['',[Validators.required,Validators.min(10)]],
        unlimitedSearch:['',Validators.required],
        chatFacility:['',Validators.required]
      })
    })

    if(this.plan){
      this.form.patchValue(
        {
          name:this.plan.name || '',
          description:this.plan.description || '',
          price:this.plan.price || '',
          duration:this.plan.duration || '',
          type:this.plan.type,
          features:this.plan.features
        }
      )

      // if(this.plan.features && this.plan.features.length>0){
      //     this.plan.features.forEach(feature=>{
      //       this.featuresForm.push(this.fb.control(feature,Validators.required));
      //     })
      // }

      
    }

    
    
  }
  
  // get featuresForm(){
  //   return this.form.get('features') as FormArray
  // }
 

  // addFeature(){
  //   this.featuresForm.push(this.fb.control('',Validators.required));
  // }

  // removeFeature(index:number){
  //   this.featuresForm.removeAt(index);
  // }

  onSubmit(){
    this.isSubmittd =true;
    console.log(this.form.controls);
    if(!this.form.invalid){
      console.log('planedit...')
      const planData = this.form.getRawValue();
      this.planService.editPlan(this.PlanId,planData).subscribe({
        next:(res)=>{
          void Swal.fire('Success','Plan Updated Successfully','success');
          this.router.navigate(['/admin/plans']);
        }
      })
    }
  }
}
