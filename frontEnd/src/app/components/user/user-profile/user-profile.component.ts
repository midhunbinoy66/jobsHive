import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IUserRes } from 'src/app/models/users';
import { selectUserState } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  user:IUserRes|null = null;
  userDetails$ = this.store.pipe(select(selectUserState));
  constructor(
    private readonly store:Store
  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe((user)=>{
      this.user = user.userDetails;
    })
  }


}
