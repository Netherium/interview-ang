import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Post} from '../models/post.model';
import {ErrorHandlingService} from './error-handling.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PostService {
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {
  }

  /** GET get post[]*/
  list(page = 1, limit = 10): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postUrl}?_page=${page}&_limit=${limit}`)
      .pipe(
        tap(posts => console.log('postService.getPosts: ' + posts.length)),
        catchError(this.errorHandler.handleError('getPosts', []))
      );
  }

  /** GET: show post by id*/
  show(id: any): Observable<Post> {
    return this.http.get<Post>(`${this.postUrl}/${id}`).pipe(
      tap(_ => console.log(`postService.getPost(${id})`)),
      catchError(this.errorHandler.handleError<Post>(`getPost id=${id}`))
    );
  }

  /** POST: create new post*/
  create(post: Post): Observable<any> {
    return this.http.post<Post>(this.postUrl, post, httpOptions).pipe(
      tap((newPost: Post) => console.log(`added post w/ id=${newPost.id}`)),
      catchError(this.errorHandler.handleError<Post>('addPost'))
    );
  }

  /** PUT: update post*/
  update(post: Post): Observable<Post> {
    return this.http.put(`${this.postUrl}/${post.id}`, post, httpOptions).pipe(
      tap(_ => console.log(`updated post id=${post.id}`)),
      catchError(this.errorHandler.handleError<any>('updatePost'))
    );
  }

  /** DELETE: delete post*/
  delete(id: string): Observable<Post> {
    return this.http.delete<Post>(`${this.postUrl}/${id}`, httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.errorHandler.handleError<Post>('deletePost'))
    );
  }
}
