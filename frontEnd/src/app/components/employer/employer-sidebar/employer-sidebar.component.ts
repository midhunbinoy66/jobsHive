import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { deleteEmployreFromStore } from 'src/app/states/employer/employer.action';

@Component({
  selector: 'app-employer-sidebar',
  templateUrl: './employer-sidebar.component.html',
  styleUrls: ['./employer-sidebar.component.css']
})
export class EmployerSidebarComponent implements OnInit{

  showSidebar=false

  constructor(
    private readonly store:Store,
    private readonly router:Router
  ){}

  ngOnInit() {
    this.checkWindowWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowWidth();
  }

  checkWindowWidth() {
    this.showSidebar = window.innerWidth >= 768;
  }


  toggleSidebar(){
    this.showSidebar = !this.showSidebar
  }

  logout(){
    localStorage.removeItem('employerAccessToken');
    localStorage.removeItem('employerRefreshToken');
    this.store.dispatch(deleteEmployreFromStore());
    void this.router.navigate(['/employer/login'])
  }
}
