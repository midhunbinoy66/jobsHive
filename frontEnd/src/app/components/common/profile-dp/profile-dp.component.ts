import { Component, EventEmitter, Input, Output, computed, effect, inject, signal } from '@angular/core';
import { CropperDialogueComponent, type CropperDialogueResult } from '../cropper-dialogue/cropper-dialogue.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-dp',
  standalone:true,
  imports:[
    CommonModule,
    CropperDialogueComponent,
    MatDialogModule,
  ],
  templateUrl: './profile-dp.component.html',
  styleUrls: ['./profile-dp.component.css']
})
export class ProfileDpComponent {

imageWidth = signal(0);

@Input() set width(val:number){
  this.imageWidth.set(val);
}


@Input() currDp:string ='';


imageHeight = signal(0);

@Input() set height(val:number){
  this.imageHeight.set(val);
}

placeholder = computed(() => 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=200')

imageSource = computed(()=>{
  return this.croppedImage()?.imageUrl ?? this.placeholder
})


croppedImage = signal<CropperDialogueResult | undefined>(undefined)
dialog =inject(MatDialog)

fileSelected(event:any):void{
  const file = event.target.files[0];
  if(file){
    const dialogRef  = this.dialog.open(CropperDialogueComponent,{
      data: { image: file, width: this.imageWidth(), height: this.imageHeight() },
      width: '500px'
    }) 

    dialogRef.afterClosed().pipe(filter(result=> !!result)).subscribe(result =>{
       this.croppedImage.set(result);
    })
  }

}


constructor () {
  effect(() => {
    if (this.croppedImage() !== undefined) {
      this.imageReady.emit(this.croppedImage()?.blob)
    }
  })
}



@Output() imageReady = new EventEmitter<Blob>()
@Output() deleteDp = new EventEmitter()


deleteProfilePic():void{
  this.croppedImage.set(undefined)
  this.deleteDp.emit()
  this.currDp = ''
}


}
