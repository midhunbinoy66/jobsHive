import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResumeRes } from 'src/app/models/resume';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employer-applican-resume',
  templateUrl: './employer-applican-resume.component.html',
  styleUrls: ['./employer-applican-resume.component.css']
})
export class EmployerApplicanResumeComponent  implements OnInit{

  userId:string='';
  userResume:IResumeRes | null = null;

  constructor(
    private route:ActivatedRoute,
    private userService:UserService
  ){}


  ngOnInit(): void {
      this.route.params.subscribe(params=>{
        this.userId = params['userId'];
        if(this.userId !== null){
          this.userService.getUserResumeDetails(this.userId).subscribe({
            next:(res)=>{
              this.userResume = res.data
            }
          })
        }
      })
  }
}
