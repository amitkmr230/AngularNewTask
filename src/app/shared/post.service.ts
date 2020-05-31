import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Post } from './post';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  private apiURL = "https://jsonplaceholder.typicode.com";
   
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    })
  }

  constructor(private http: HttpClient) { }  

  form: FormGroup = new FormGroup({
    id : new FormControl(''),
    title : new FormControl('', Validators.required),
    body : new FormControl('', Validators.required)
  });

  initializeFormGroup() {
    this.form.setValue({
      id : '',
      title : '',
      body : ''
    })
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  create(post): Observable<Post> {
    return this.http.post<Post>(this.apiURL + '/posts/', post, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  
   
  find(id): Observable<Post> {
    return this.http.get<Post>(this.apiURL + '/posts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  update(id, post): Observable<Post> {
    return this.http.put<Post>(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
   
  delete(id){
    return this.http.delete<Post>(this.apiURL + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }
    
  
  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }

 populateForm(posts) {
  this.form.setValue(_.omit(posts, this.form.value));
}
  
}
