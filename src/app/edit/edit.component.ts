import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup} from '@angular/forms';
import {Validators, Editor, Toolbar} from 'ngx-editor';

import {ArticleService} from '../service/article.service';
import {ArticleContent} from '../interface/article';

import jsonDoc from './doc';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router: Router) {
  }

  editordoc = jsonDoc;
  article: ArticleContent;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{heading: ['h1', 'h2', 'h3', 'h4', 'h5']}],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  form = new FormGroup({
    title: new FormControl('', Validators.required()),
    path: new FormControl(''),
    editorContent: new FormControl(
      {value: '', disabled: false},
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent') as AbstractControl;
  }

  ngOnInit(): void {
    this.editor = new Editor();
    let id: string = <string>this.route.snapshot.paramMap.get('id');
    if (id) {
      this.articleService.getContent(id)
        .subscribe(value => {
          this.article = value;
          this.form.controls.editorContent.setValue(value.content);
          this.form.controls.path.setValue(value.path);
          this.form.controls.title.setValue(value.title);
        })
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
    let art: ArticleContent = {
      title: <string>this.form.value.title,
      author: "ME",
      content: <string>this.form.value.editorContent,
      path: <string>this.form.value.path
    };
    debugger;
    if (this.article) {
      art.id = this.article.id
      art.author = this.article.author;
      this.articleService.updateArticle(art).subscribe()
    } else {
      this.articleService.createArticle(art).subscribe()
    }
    debugger;
    this.router.navigate(["/pages"])
  }

}
