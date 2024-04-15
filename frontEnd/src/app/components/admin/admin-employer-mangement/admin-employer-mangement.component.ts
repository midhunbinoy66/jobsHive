import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployerRes } from 'src/app/models/employer';
import { EmployerService } from 'src/app/services/employer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-employer-mangement',
  templateUrl: './admin-employer-mangement.component.html',
  styleUrls: ['./admin-employer-mangement.component.css']
})
export class AdminEmployerMangementComponent implements OnInit {


  users:IEmployerRes[] = [];
  currPage =1
  itemsPerPage =10
  searchQuery=''
  userCount =0

  constructor(
    private readonly router:Router,
    private readonly employerService:EmployerService
  ){}

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.employerService.getAllUsers(this.currPage,this.itemsPerPage,this.searchQuery).subscribe({
      next:(res)=>{

        if(res.data !== null){
          this.users = res.data.users
          this.userCount = res.data.userCount
        }
      }
    })
  }

  onBlock(userId:string,action:'Block'| 'Unblock'):void{
    void Swal.fire({
      title:'Are you Sure',
      text:`Do you want to ${action} this user`,
      icon:'warning',
      confirmButtonText:`Yes, ${action} `,
      cancelButtonText:'No, Cancel!' 
    }).then(result=>{
      if(result.isConfirmed){
        this.employerService.blockUser(userId).subscribe({
          next:()=>{
            const userIdx = this.users.findIndex(user => user._id === userId)
            if (userIdx !== -1) {
              this.users = [
                ...this.users.slice(0, userIdx),
                { ...this.users[userIdx], isBlocked: !this.users[userIdx].isBlocked },
                ...this.users.slice(userIdx + 1)
              ]
            }
          }
        })
      }
    })

  }

  onSearchUser(searchQuery:string){
    this.searchQuery =searchQuery;
    this.getUsers();
  }

  onPageChange(page:number){
    this.currPage = page;
    this.getUsers();
  }

  onItemsPerPageChange(itemsPerPage:number){
    this.itemsPerPage = itemsPerPage
    this.currPage = 1;
    this.getUsers();
  }
}

