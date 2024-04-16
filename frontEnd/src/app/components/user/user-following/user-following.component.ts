import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { IUserRes } from 'src/app/models/users';
import { EmployerService } from 'src/app/services/employer.service';
import { UserService } from 'src/app/services/user.service';
import { saveUserOnStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit { 

  userDetails$ = this.store.pipe(select(selectUserDetails));
  user:IUserRes| null = null;
  employers:IEmployerRes[]=[]
  following:string[] =[];

  constructor(  
    private readonly store:Store,
    private readonly employerService:EmployerService,
    private readonly userService:UserService
  ){}

  ngOnInit(): void {


    this.initialize();
  }

  initialize(){
    this.userDetails$.subscribe(res=>{
      this.user = res;
      if(this.user && this.user.following && this.user.following.length>0){
        this.following = this.user.following
      }
    })
    this.employerService.getFollowingEmployers(this.following).subscribe({
      next:(res)=>{
        this.employers = res.data
      }
    })
  }

  onUnFollow(employerId:string){
    this.userService.unfollowEmployer(this.user!._id,employerId).subscribe({
      next:(res)=>{
        this.store.dispatch(saveUserOnStore({userDetails:res.data}))
        this.initialize()
        void Swal.fire('Success','UnFollowed','success');
       
      }
    })
  }
}
