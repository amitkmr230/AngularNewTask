import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  postList:Post[] = []
  id: number;

  constructor(public service: PostService, 
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PostEditComponent>) { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.service.update(this.id, this.service.form.value).subscribe(res => {
      console.log('Post updated successfully!');
 })
    console.log("updating");
    this.service.form.reset();
      this.service.initializeFormGroup();      
      this.onClose();
      this.notificationService.success(':: Updated Successfully');
  }


  onClick() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Cleared Successfully');
  }

  onClose() {
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.dialogRef.close();    
  }

}
