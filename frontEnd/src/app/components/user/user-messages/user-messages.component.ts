import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IApiChatRes, IChatMessage, IChatReqs } from 'src/app/models/chat';
import { IAPiEmployerRes, IEmployerRes } from 'src/app/models/employer';
import { IUserRes } from 'src/app/models/users';
import { EmployerService } from 'src/app/services/employer.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { imagesFolderPath } from 'src/app/shared/constants';
import { selectUserDetails } from 'src/app/states/user/user.selector';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit ,OnDestroy{
  message =''
  userDetails$ = this.store.pipe(select(selectUserDetails));
  chats:IChatMessage[ ]=[];
  employerId:string ='';
  userId =''
  userName ='User'
  employers:IEmployerRes[]=[]
  currEmployer!:IEmployerRes
  imageFolderPath=imagesFolderPath
  followings:IEmployerRes[]=[];
  user!:IUserRes

  constructor(
    private readonly socketService:WebSocketService,
    private readonly employerService:EmployerService,
    private readonly userService:UserService,
    private readonly route:ActivatedRoute,
    private readonly store:Store

  ){
    this.userDetails$.subscribe((user)=>{
      if(user !== null){
        this.user = user;
        this.userId = user._id;
        this.userName = user.name;
      }
    })
    socketService.connectSocket(this.userId);
  }


  ngOnInit(): void {

    if(this.user.following !== undefined){
      
      this.employerService.getFollowingEmployers(this.user.following).subscribe({
        next:(res)=>{
          this.followings =res.data
        }
      })
    }

    this.employerService.getEmployersChattedWith(this.userId).subscribe({
      next:(res)=>{
        this.employers = res.data;
      }
    })

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id !== null){
        this.employerService.getEmployerData(id).subscribe({
          next:(res)=>{
            this.currEmployer =res.data;
          }
        })
      }
    })

    this.socketService.listent('recieve-message').subscribe((data)=>{this.updateMessage(data)})
  }


  ngOnDestroy (): void {
    this.socketService.disconnectSocket()
  }


  onSelectEmployer(employer:IEmployerRes):void{
    this.currEmployer = employer;
    console.log(this.currEmployer,'this is from onSelect employer');
    this.userService.getChatHistory(employer._id,this.userId).subscribe({
      next:(res)=>{
        if(res.data !== null){
          this.chats = res.data.messages;
        }
      }
    })
  }


  updateMessage (res: IApiChatRes): void {
    // this.feedback = ''
    if (res.data == null) return
    console.log(res.data.messages, 'data from update message')
    this.chats = res.data.messages
  }


  sendMessage():void{
    if(this.message !==''){
      const msgData:IChatReqs ={
        userId : this.userId,
        employerId:this.currEmployer._id,
        sender:'User',
        message:this.message
      }

      this.chats.push({
        sender:'User',
        message:this.message,
        time:new Date(),
        isRead:false
      })
      this.socketService.emit('send-message',msgData);
      this.message =''
    }
  }


}
