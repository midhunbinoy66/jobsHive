import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IWalletHistory } from 'src/app/models/common';
import { IEmployerRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-wallet',
  templateUrl: './employer-wallet.component.html',
  styleUrls: ['./employer-wallet.component.css']
})
export class EmployerWalletComponent implements OnInit{

  employerDetails$ = this.store.pipe(select(selectEmployerDetails));
  employer!:IEmployerRes
  employerId ='';
  count = 0
  page = 1
  itemsPerPage = 10
  walletHistory: IWalletHistory[] = []

  constructor(
    private readonly store:Store,
    private readonly employerService:EmployerService
  ){}

  ngOnInit(): void {
    this.employerDetails$.subscribe((res)=>{
      if(res === null) return 
        this.employer = res;
        this.employerId = res._id;
    })
    this.getWalletHistory()
  }


  getWalletHistory(){
    this.employerService.getWalletHistory(this.employerId,this.page,this.itemsPerPage).subscribe({
      next:(res)=>{
        if(res.data !== null){
          this.walletHistory = res.data.walletHistory
          this.count = res.data.count;
        }
      }
    })
  }


  onPageChange(page:number):void{
    this.page = page
    this.getWalletHistory(); 
  }

  onItemsPerPageChange(itemsPerPage : number):void{
    this.itemsPerPage = itemsPerPage;
    this.page = 1
    this.getWalletHistory();
  }
}
