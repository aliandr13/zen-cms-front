import {Component, OnInit} from '@angular/core';
import {Article} from '../interface/article';
import {ArticleService} from '../service/article.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  selected: Article;
  articles: Article[];
  index: number;

  constructor(private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.articleService.articles$
      .subscribe(data => this.articles = data);
  }

  select(article: Article, index: number): void {
    this.selected = article;
    this.index = index;
  }

  deleteSelected() {
    console.log('About to delete article id: ', this.selected.id)
    this.articleService.delete(this.selected).subscribe(success => {
      this.articles.splice(this.index, 1);
    });
  }

  publishSelected() {
    this.selected.published = true;
    this.articleService.updatePart(this.selected)
      .subscribe(success => {
        this.articles[this.index].published = true;
      });
  }

  unPublishSelected() {
    this.selected.published = false;
    this.articleService.updatePart(this.selected)
      .subscribe(success => {
        this.articles[this.index].published = false;
      });
  }
}
