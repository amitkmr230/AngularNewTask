import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {FormGroup, FormControl, Validators} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private _allPosts = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) { }

  form: FormGroup = new FormGroup({
    $key : new FormControl(null),
    title : new FormControl('', Validators.required),
    description : new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      $key : null,
       title : '',
      description : ''
    })
  }

  getAllPosts() {
    return this.http.get<any>(this._allPosts) 
  }

  // addNewPost(post) {
  //   this.posts.push({
  //     title: post.title,
  //     description: post.description
  //   })
  // }

  
}
