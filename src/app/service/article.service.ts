import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Article, ArticleContent } from '../interface/article';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl: string = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  articles$ = <Observable<Article[]>>this.http.get<Article[]>(`${this.apiUrl}/articles`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

    articlesCount$ =  <Observable<number>>this.http.get<Article[]>(`${this.apiUrl}/articles/count`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

    creatArticle(article: ArticleContent) {
      console.log(article);
      return this.http.post<ArticleContent>(`${this.apiUrl}/articles`, article).pipe(
        tap(console.log),
        catchError(this.handleError)
      )
    }
    // articleCreate$ = <Observable<ArticleContent>>this.http.post<ArticleContent>(`${this.apiUrl}/articles`, )
    // .pipe(
      // tap(console.log)
      // catchError(this.handleError)
    // )

  handleError(error: any): Observable<never> {
    return throwError(() => new Error('test: ' + error))
  }
}
