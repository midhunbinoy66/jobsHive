import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { IApiPlanRes, IPlan } from 'src/app/models/plans';
import { PlanService } from 'src/app/services/plan.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-plans',
  templateUrl: './admin-plans.component.html',
  styleUrls: ['./admin-plans.component.css']
})
export class AdminPlansComponent  implements OnInit{

  plans:IPlan[] | null =[]

  constructor(
    private readonly planService:PlanService,
    private readonly router:Router,

  ){}

  ngOnInit(): void {
    this.planService.findAllPlans().subscribe({
      next:(res)=>{
        this.plans =res.data
      }
    })
  }

  onDelete(planId:string){
    this.planService.deletePlan(planId).subscribe({
      next:(res)=>{

        const planIdx = this.plans!.findIndex(plan => plan._id === planId)
        if (planIdx !== -1) {
          this.plans = [
            ...this.plans!.slice(0, planIdx),
            { ...this.plans![planIdx], isActive: !this.plans![planIdx].isActive },
            ...this.plans!.slice(planIdx + 1)
          ]
        }
        void Swal.fire('Success','Plan deleted successfully','success');
      }
    })
  }

  onEdit(planId:string){
    this.router.navigate([`/admin/plan-edit/${planId}`])
  }
}