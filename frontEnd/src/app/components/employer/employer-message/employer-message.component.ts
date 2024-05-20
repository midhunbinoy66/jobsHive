import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { IApiChatRes, IChatMessageRes, IChatReqs, IChatRes, IUsersListForChats } from 'src/app/models/chat';
import { EmployerService } from 'src/app/services/employer.service';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { imagesFolderPath } from 'src/app/shared/constants';
import { selectEmployerDetails } from 'src/app/states/employer/employrer.selector';

@Component({
  selector: 'app-employer-message',
  templateUrl: './employer-message.component.html',
  styleUrls: ['./employer-message.component.css']
})
export class EmployerMessageComponent  implements OnInit,OnDestroy{

  message =''
  chats:IChatMessageRes[]=[]
  employerDetails$ = this.store.pipe(select(selectEmployerDetails));
  employerId =''
  userId =''
  employerName = ''
  users:IUsersListForChats[]=[]
  imageFolderPath = imagesFolderPath
  currUser?:IUsersListForChats
  isRecording=false;
  @ViewChild('audioPlayback') audioPlayback!:ElementRef<HTMLAudioElement>
  mediaRecorder!:MediaRecorder
  audioChunks:Blob[]=[]
  audioBlob!:Blob;
  selectedImage: File | null =null;
  previewImageUrl: SafeUrl | null = null;

  constructor(
    private readonly store:Store,
    private readonly route:ActivatedRoute,
    private readonly employerService:EmployerService,
    private readonly socketServic:WebSocketService,
    private readonly userService:UserService,
    private sanitizer: DomSanitizer

  ){
    this.employerDetails$.subscribe((employer)=>{
      if(employer !== null){
         this.employerId = employer._id
         this.employerName = employer.name
      }
    })

    socketServic.connectSocket(this.employerId);
  }

ngOnInit(): void {
    this.userService.getUsersChattedWith(this.employerId).subscribe({
      next:(res)=>{
        if(res.data !== null){
          this.users = res.data
        }
      }
    })

    this.socketServic.listent('recieve-message').subscribe((res:IApiChatRes)=>{
      if(res.data !== null){
        this.updateMessage(res.data);
      }
    })
}

ngOnDestroy(): void {
  this.socketServic.disconnectSocket()
}


onSelectUser(user:IUsersListForChats,index:number){
  this.currUser = user;
  this.employerService.getChatHistory(this.employerId,this.currUser._id).subscribe({
    next:(res)=>{
      if(res.data !== null){
        this.chats = res.data.messages;
        this.users = [
          ...this.users.slice(0,index),
          {...this.users[index],unreadCount:0},
          ...this.users.slice(index+1)
        ]
      }
    }
  })
}


updateMessage(chatRes:IChatRes):void{
  if(this.currUser !== undefined && this.currUser._id == chatRes.userId){
    this.chats = chatRes.messages;
    const lasMsg  = chatRes.messages[chatRes.messages.length-1];
    if(lasMsg !== undefined){
      this.employerService.markLastMessageAsRead(chatRes.userId,chatRes.employerId,chatRes.adminId,lasMsg._id).subscribe({
        next:()=>{
          console.log('message marked read');
        }
      })
    }
  }else{
    const userIdx = this.users.findIndex(user=> user._id === chatRes.userId)
    this.users = [
      ...this.users.slice(0,userIdx),
      {...this.users[userIdx],unreadCount: this.users[userIdx].unreadCount+1},
      ...this.users.slice(userIdx+1)
    ]
  }
}

sendMessage():void{
  if(this.currUser === undefined) return 
  if(this.message !== ''){
    const msgData :IChatReqs ={
      userId:this.currUser._id,
      employerId:this.employerId,
      sender:'Employer',
      message:this.message
    }
    this.chats.push({
      _id: '',
      sender: 'Employer',
      message: this.message,
      time: new Date(),
      isRead: false
    })
    this.socketServic.emit('send-message', msgData)
    this.message = ''

  }
}



async toggleRecording(){
  if(this.isRecording){
    this.mediaRecorder.stop()
  }else{
    const stream = await navigator.mediaDevices.getUserMedia({audio:true});
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.ondataavailable = (event)=>{
      this.audioChunks.push(event.data);
    }

    this.mediaRecorder.onstop=()=>{
      this.audioBlob = new Blob(this.audioChunks,{type:'audio/webm'});
      this.audioPlayback.nativeElement.src = URL.createObjectURL(this.audioBlob);
      this.audioChunks =[];
    }
    this.mediaRecorder.start();
  }
  this.isRecording = !this.isRecording;
}



sendAudioMessage(){
  if(!this.audioBlob) return 
  this.userService.uploadChatAudio(this.audioBlob).subscribe(audioUrl=>{
    this.message =audioUrl;
    this.sendMessage();
  })


}

isAudioMessage(message: string): boolean {
  return message.endsWith('.webm');
}

getAudioUrl(message: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/audios/${message}`);
}


fileSelected(event:any){
  const file = event.target.files[0];
  if(file){
    this.selectedImage = file;
    this.previewImageUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
} 

sendImage(){
  if(!this.selectedImage) return 
  this.userService.uploadChatImage(this.selectedImage).subscribe(data=>{
    this.message =data;
    this.sendMessage();
    this.selectedImage = null;
    this.previewImageUrl = null;
  })
}

isImageMessage(message: string): boolean {
  return /\.(jpeg|jpg|png|gif)$/.test(message);
}

getMediaUrl(message: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl(`http://localhost:3000/images/${message}`);
}


}
