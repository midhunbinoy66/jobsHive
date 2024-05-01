import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IUserRes } from 'src/app/models/users';
import { deleteUserFromStore } from 'src/app/states/user/user.action';
import { selectUserDetails } from 'src/app/states/user/user.selector';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  trialUser!:IUserRes
  isLoggedIn:boolean = false;
  showSidebar = false;
  userDetails$ = this.store.pipe(select(selectUserDetails));
  imageFolderPath = environment.baseUrl+'images/'
  constructor(
    private readonly router:Router,
    private readonly store:Store
  ){}


  ngOnInit(): void {
    console.log(this.imageFolderPath);
    this.userDetails$.subscribe((res)=>{
      if(res !== null)
      this.trialUser = res
    })

    console.log(this.imageFolderPath+this.trialUser.profilePic);
  }

  toggleSideBar():void{
    this.showSidebar = !this.showSidebar
  }

  onLogout(){
    localStorage.removeItem('userAccessToken')
    localStorage.removeItem('userRefreshToken')
    this.store.dispatch(deleteUserFromStore())
    void this.router.navigate(['/user/home'])
  }
}
