import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserRes } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit{

  users:IUserRes[] = [];
  currPage =1
  itemsPerPage =10
  searchQuery=''
  userCount =0

  constructor(
    private readonly router:Router,
    private readonly userService:UserService
  ){}

  ngOnInit(): void {
    this.getUsers()
  }


  getUsers(){
    this.userService.getAllUsers(this.currPage,this.itemsPerPage,this.searchQuery).subscribe({
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
        this.userService.blockUser(userId).subscribe({
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
