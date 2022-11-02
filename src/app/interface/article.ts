export interface Article {
  id: number;
  title: string;
  path: string;
  published: boolean;
  author: string;
  created: Date;
  updated: Date;
}

export interface ArticleContent {
  id?: number;
  title: string;
  path: string;
  author: string;
  content: string;
}
