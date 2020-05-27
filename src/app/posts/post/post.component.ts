import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(public service: PostService, 
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PostComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.service.form.valid) {
      
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted Successfully');
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
