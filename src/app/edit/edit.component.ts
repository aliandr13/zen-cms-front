import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Validators, Editor, Toolbar } from 'ngx-editor';

import { ArticleService } from '../service/article.service';
import { ArticleContent } from '../interface/article';

import jsonDoc from './doc';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {

  constructor(private articleService: ArticleService) { }

  editordoc = jsonDoc;

  editor: Editor;
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];


  form = new FormGroup({
    title: new FormControl('', Validators.required()),
    path: new FormControl(''),
    editorContent: new FormControl(
      { value: "<h2>Hello world</h2>", disabled: false },
      Validators.required()
    ),
  });

  get doc(): AbstractControl {
    return this.form.get('editorContent') as AbstractControl;
  }

  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.form.value);
    console.log(this.form.value.editorContent)

    this.articleService.creatArticle( {
      title: <string>this.form.value.title,
      author: 'Me',
      content: <string>this.form.value.editorContent,
      path: <string>this.form.value.path
    })
    .subscribe()

    // new ArticleContent()
    // debugger
  }

}
