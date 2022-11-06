import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Article, ArticleContent} from '../interface/article';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private readonly apiUrl: string = `${environment.apiUrl}/api/articles`;

  constructor(private http: HttpClient) {
  }

  articles$ = <Observable<Article[]>>this.http.get<Article[]>(`${this.apiUrl}`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  articlesCount$ = <Observable<number>>this.http.get<Article[]>(`${this.apiUrl}/count`)
    .pipe(
      tap(console.log),
      catchError(this.handleError)
    )

  createArticle(article: ArticleContent) {
    console.log(article);
    return this.http.post<ArticleContent>(`${this.apiUrl}`, article).pipe(
      tap(console.log),
      catchError(this.handleError)
    )
  }

  updateArticle(article: ArticleContent) {
    console.log(article);
    return this.http.put<ArticleContent>(`${this.apiUrl}`, article).pipe(
      tap(console.log),
      catchError(this.handleError)
    )
  }

  getContent(id: string): Observable<ArticleContent> {
    return <Observable<ArticleContent>>this.http.get<ArticleContent>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(console.log),
        catchError(this.handleError)
      )
  }

  handleError(error: any): Observable<never> {
    return throwError(() => new Error('test: ' + error))
  }

  delete(article: Article): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${article.id}`).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

  updatePart(article: Article): Observable<any> {
    return this.http.patch(`${this.apiUrl}`, article).pipe(
      tap(console.log),
      catchError(this.handleError)
    );
  }

}
