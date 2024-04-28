import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getRandomColor } from 'src/app/helpers/getRandomColor';
import { ILineGraphData } from 'src/app/models/chart';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit{
  data!: ILineGraphData
  constructor(
    private readonly router:Router,
    private readonly adminService:AdminService
  ){}

  ngOnInit(): void {
    this.adminService.getRevenueData().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.data === null) return 
        this.data ={
          labels:res.data.labels,
          datasets:[
            {
              label:'Trasaction Graph',
              data:res.data.data,
              fill:false,
              borderColor:getRandomColor(),
              tension:0.4
            }
          ]
        }
      }
    })
  }

  onLogout(){
    localStorage.removeItem('adminAccessToken')
    localStorage.removeItem('adminRefreshToken')
    void this.router.navigate(['/admin/login'])
  }
}
