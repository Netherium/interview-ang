import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Article} from '../models/article.model';
import {ErrorHandlingService} from './error-handling.service';
import {ArticleResultSet} from '../models/articleResultSet.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiKey = 'a541a3d216e64540b1082720443b1042';

@Injectable({
  providedIn: 'root'
})

export class NewsService {
  private apiUrl = 'https://newsapi.org/v2';

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) {
  }

  // https://newsapi.org/v2/everything?q=bitcoin&from=2018-09-23&sortBy=publishedAt&apiKey=a541a3d216e64540b1082720443b1042

  suggest(term: string): Observable<any> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<any>(`${this.apiUrl}/everything?q=${term}&apiKey=${apiKey}`)
      .pipe(
        tap(result => console.log('articleService.getArticles: ' + result)),
        catchError(this.errorHandler.handleError('getArticles', []))
      );
  }

  list(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/everything?q=bitcoin&apiKey=${apiKey}`)
      .pipe(
        tap(result => console.log('articleService.getArticles: ' + result)),
        catchError(this.errorHandler.handleError('getArticles', []))
      );
  }
}
