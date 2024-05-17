import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getRandomColor } from 'src/app/helpers/getRandomColor';
import { ILineGraphData } from 'src/app/models/chart';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent  implements OnInit{
  data!:ILineGraphData
  transactionForm!:FormGroup

  constructor(
    private fb:FormBuilder,
    private adminService:AdminService
  ){}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      startDate:['',Validators.required],
      endDate:['',Validators.required]
    })
    this.adminService.getRevenueData().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.data === null) return 
        this.data ={
          labels:res.data.labels,
          datasets:[
            {
              label:'Trasaction Graph',
              data:res.data.data,
              fill:false,
              borderColor:getRandomColor(),
              tension:0.4
            }
          ]
        }
      }
    })

  }



  onTransactionSubmit(){
    if(this.transactionForm.valid){
      const formData = this.transactionForm.getRawValue();
      const startDate = new Date(formData.startDate);
      const endDate  = new Date(formData.endDate);
      this.adminService.generateReport(startDate,endDate).subscribe({
        next:(res)=>{
          const pdfUrl = res.data; 
          window.open('http://localhost:3000/resumes/'+pdfUrl, '_blank');
  
        }
      })
    }

  }
}
