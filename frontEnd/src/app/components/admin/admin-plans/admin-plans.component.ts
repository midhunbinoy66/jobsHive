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
  pageNumber=1;
  pageSize = 4
  totalItems =0
  maxPage = 0;
  planType:string='Type'
  filtered = false;

  plans:IPlan[] | null =[]
  filterdPlans:IPlan[] | null =[]
  constructor(
    private readonly planService:PlanService,
    private readonly router:Router,

  ){}

  ngOnInit(): void {
    this.getPlans();
  }

  getPlans(){
    this.planService.findAllPlans(this.pageNumber,this.pageSize).subscribe({
      next:(res)=>{
        if(res.data?.plans){
          this.plans =res.data.plans
          this.totalItems = res.data.planCount
          this.maxPage =Math.ceil(this.totalItems/this.pageSize);
        }
      }
    })
  }

  onPageChange(page:number){
    this.pageNumber =page;
    this.getPlans();
    this.filtered =false;
  }

  onDelete(planId:string){
    this.planService.deletePlan(planId).subscribe({
      next:(res)=>{

        // const planIdx = this.plans!.findIndex(plan => plan._id === planId)
        // if (planIdx !== -1) {
        //   this.plans = [
        //     ...this.plans!.slice(0, planIdx),
        //     { ...this.plans![planIdx], isActive: !this.plans![planIdx].isActive },
        //     ...this.plans!.slice(planIdx + 1)
        //   ]
        // }
        this.getPlans()
        void Swal.fire('Success','Plan deleted successfully','success');
      }
    })
  }

  onEdit(planId:string){
    this.router.navigate([`/admin/plan-edit/${planId}`])
  }

  onPlanChange(){
    this.filtered = true
    if(this.plans !== null){
      this.filterdPlans = this.plans!.filter(plan=>plan.type===this.planType);
      console.log(this.filterdPlans);
    }


  }
}
