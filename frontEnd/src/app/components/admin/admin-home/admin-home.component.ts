import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(
    private router:Router
  ){}
  onLogout(){
    localStorage.removeItem('adminAccessToken')
    localStorage.removeItem('adminRefreshToken')
    void this.router.navigate(['/admin/login'])
  }
}
