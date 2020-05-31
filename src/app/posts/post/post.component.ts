import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/shared/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  postList:Post[] = []

  constructor(public service: PostService, 
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PostComponent>) { }

  ngOnInit(): void {
    // this.service.getAll().subscribe((data: Post[])=>{
    //   this.postList = data;
    //   console.log(this.postList);
    // })
  }

  onSubmit() {
    if(this.service.form.valid) {
      console.log(this.service.form.value);
      this.service.create(this.service.form.value).subscribe(res => {
        this.postList.push(res);
        localStorage.setItem('posts', JSON.stringify(this.postList))
         console.log(this.postList, 'Post created successfully!');
         this.ngOnInit()
         this.notificationService.success(':: Submitted Successfully');
    },
    err => {
      console.log(err);
      this.notificationService.success(':: Error while submitting. Please try again.');
    })
      this.service.form.reset();
      this.service.initializeFormGroup();      
      this.onClose()
    }
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
