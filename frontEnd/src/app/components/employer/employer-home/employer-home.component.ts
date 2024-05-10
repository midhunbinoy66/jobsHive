import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getRandomColor } from 'src/app/helpers/getRandomColor';
import { ILineGraphData } from 'src/app/models/chart';
import { IEmployerRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.css']
})
export class EmployerHomeComponent implements OnInit {
  data!: ILineGraphData
  emloyer$ = this.store.pipe(select(selectEmployerDetails));
  employer:IEmployerRes | null = null
    constructor(
      private readonly router:Router,
      private readonly employerService:EmployerService,
      private readonly store:Store
    ){}



    ngOnInit(): void {
      this.emloyer$.subscribe((res)=>{
        this.employer = res
      })
      if(this.employer?._id){
        this.employerService.getApplicationData(this.employer._id).subscribe({
          next:(res)=>{
            console.log(res);
            if(res.data === null) return 
            this.data ={
              labels:res.data.labels.map(label=> label.slice(0,6)),
              datasets:[
                {
                  label:'Applcations Graph',
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

    }

  onLogout(){
    localStorage.removeItem('employerAccessToken')
    localStorage.removeItem('employerRefreshToken')
    void this.router.navigate(['/employer/login'])
  }
}
