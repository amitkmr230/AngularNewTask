import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Post } from './post';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

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

  //Http request to add a enquiry in the database
  addPost(post: Post) { 
    return this.http.post(this._allPosts, post)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  deletePost(id: any) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    return this.http.delete(`${this._allPosts}/${id}`, {headers})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  //Method to handle error scenario 
  handleError(error) {
    let errorMessage = '';
    if (error.error) {
        errorMessage = `${error.error.text}`;
    }
    return throwError(errorMessage);
  }
  
}
