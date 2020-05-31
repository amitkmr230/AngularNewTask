import { Component, OnInit, Input } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { Post } from 'src/app/shared/post';
import { PostEditComponent } from '../post-edit/post-edit.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList:Post[] = []

  constructor(private service: PostService, private dialog: MatDialog, public notificationService: NotificationService) {
   }

  ngOnInit(): void {
    this.service.getAll().subscribe((data: Post[])=>{
      this.postList = data;
      console.log(this.postList);
    }) 
  }

  onCreate() {
    this.service.initializeFormGroup()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(PostComponent, dialogConfig)
  }

  onEdit(){
    this.service.populateForm(this.service.form.value);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(PostEditComponent, dialogConfig)
  }

  // Method to delete a enquiry
  delete(id){
    this.notificationService.success(':: Wait, Your request is being processing.');
    this.service.delete(id).subscribe(res => {
         this.postList = this.postList.filter(item => item.id !== id);
         console.log('Post deleted successfully!');
         this.notificationService.success(':: Deleted Successfully');
    },
    err => {
      console.log(err);
      this.notificationService.success(':: Error deleting. Please try again later');
    } 
    )
  }
}
