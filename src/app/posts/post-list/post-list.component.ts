import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/shared/post.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postList: []

  constructor(private service: PostService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.service.getAllPosts()
      .subscribe(
        res => this.postList = res,
        err => console.log(err)
      )
  }

  onCreate() {
    this.service.initializeFormGroup()
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PostComponent, dialogConfig)
  }

}
