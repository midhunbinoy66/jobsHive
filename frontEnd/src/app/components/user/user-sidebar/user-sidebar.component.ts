import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IPlan } from 'src/app/models/plans';
import { IUserRes } from 'src/app/models/users';
import { PlanService } from 'src/app/services/plan.service';
import { deleteUserFromStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {
  showSidebar = false;
  userDetails$ = this.store.pipe(select(selectUserDetails));
  user:IUserRes| null = null;
  userPlan:IPlan| null = null;
  constructor(
    private readonly router:Router,
    private readonly store:Store,
    private readonly planService:PlanService
  ){}

  ngOnInit() {
    this.checkWindowWidth();
    this.userDetails$.subscribe((res)=>{
        this.user = res;
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.showSidebar = window.innerWidth >= 768;
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }



  checkPlan(){
    if(this.user?.subscription){
      this.planService.findUserPlan(this.user?.subscription?.planId).subscribe({
        next:(res)=>{
          this.userPlan =res.data;
          if(this.userPlan?.features.chatFacility){
            this.router.navigateByUrl('user/messages')
          }else{
            void Swal.fire('Oops','Your plan does not support this feature','error')
          }
        }
      })
    }else{
      void Swal.fire('Oops','You dont have an active subscription','error');
    }

  }

  logout(){
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('userRefreshToken')
    this.store.dispatch(deleteUserFromStore())
    void this.router.navigate(['/user/home'])
  }
}
