import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from './service/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'zencms-admin-front';

  artCount$: Observable<number> | undefined;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.artCount$ = this.articleService.articlesCount$
  }

}
