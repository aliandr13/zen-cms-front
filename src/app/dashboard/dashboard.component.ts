import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleService } from '../service/article.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  artCount$: Observable<number> | undefined;
  

  constructor(private articleService: ArticleService) { }

  ngOnInit(): void {
    this.artCount$ = this.articleService.articlesCount$
  }

}
