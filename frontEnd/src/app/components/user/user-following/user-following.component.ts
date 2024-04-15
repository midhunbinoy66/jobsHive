import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IEmployerRes } from 'src/app/models/employer';
import { IUserRes } from 'src/app/models/users';
import { EmployerService } from 'src/app/services/employer.service';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent implements OnInit { 

  userDetails$ = this.store.pipe(select(selectUserDetails));
  user:IUserRes| null = null;
  employers:IEmployerRes[]=[]

  constructor(  
    private readonly store:Store,
    private readonly employerService:EmployerService
  ){}

  ngOnInit(): void {
    this.userDetails$.subscribe(res=>{
      this.user = res;
    })

    
  }
}
