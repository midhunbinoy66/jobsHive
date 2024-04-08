import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.css']
})
export class EmployerHomeComponent {

    constructor(
      private readonly router:Router
    ){}

  onLogout(){
    localStorage.removeItem('employerAccessToken')
    localStorage.removeItem('employerRefreshToken')
    void this.router.navigate(['/employer/login'])
  }
}
