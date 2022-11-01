import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interface/article';
import { ArticleService } from '../service/article.service';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  articles$: Observable<Article[]> | undefined;

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.articles$ = this.articleService.articles$
  }

}
