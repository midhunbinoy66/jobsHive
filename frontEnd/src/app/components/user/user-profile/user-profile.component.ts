import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IUserRes } from 'src/app/models/users';
import { RazorpayService } from 'src/app/services/razorpay.service';
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
    private readonly store:Store,
    private readonly razorpayService:RazorpayService
  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe((user)=>{
      this.user = user.userDetails;
    })
  }


}
