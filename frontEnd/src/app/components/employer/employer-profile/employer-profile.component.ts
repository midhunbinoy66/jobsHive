import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';


@Component({
  selector: 'app-employer-profile',
  templateUrl: './employer-profile.component.html',
  styleUrls: ['./employer-profile.component.css']
})
export class EmployerProfileComponent implements OnInit{
  
  employerDetails$=this.store.pipe(select(selectEmployerDetails))
  employer:IEmployerRes | null = null

  constructor(
    private readonly employerService:EmployerService,
    private readonly store:Store
  ){}

  ngOnInit(): void {
    this.employerDetails$.subscribe((res)=>{
      this.employer = res
    })
  }

}
