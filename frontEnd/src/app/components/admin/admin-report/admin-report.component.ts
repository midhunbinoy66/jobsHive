import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.css']
})
export class AdminReportComponent  implements OnInit{

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
  }



  onTransactionSubmit(){
    if(this.transactionForm.valid){
      const formData = this.transactionForm.getRawValue();
      const startDate = new Date(formData.startDate);
      const endDate  = new Date(formData.endDate);
      this.adminService.generateReport(startDate,endDate).subscribe({
        next:(res)=>{
          console.log(res);
          // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          // const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
          // console.log(pdfBlob);
          // const pdfUrl  = URL.createObjectURL(pdfBlob );
          // const newWindow = window.open();
          // if(newWindow)
          // newWindow.document.write('<iframe src="' + pdfUrl + '" style="width:100%;height:100%;" frameborder="0"></iframe>');
          const pdfUrl = res.data; 
          window.open('http://localhost:3000/resumes/'+pdfUrl, '_blank');
  
        }
      })
    }

  }
}
