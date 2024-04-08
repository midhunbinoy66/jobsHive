import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { deleteEmployreFromStore } from 'src/app/states/employer/employer.action';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-nav',
  templateUrl: './employer-nav.component.html',
  styleUrls: ['./employer-nav.component.css']
})
export class EmployerNavComponent {

  employerDetails$ = this.store.pipe(select(selectEmployerDetails)) 
  showSidebar = false;
  constructor(
    private readonly store:Store,
    private readonly router:Router
  ){}

  toggleSideBar(){
    this.showSidebar = !this.showSidebar
  }

  onLogout(){
    localStorage.removeItem('employerAccessToken');
    localStorage.removeItem('employerRefreshToken');
    this.store.dispatch(deleteEmployreFromStore());
    void this.router.navigate(['/employer/login'])
  }
}
