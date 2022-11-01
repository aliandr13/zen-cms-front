export interface Article {
    id?: number;
    title: string;
    published: boolean;
    author: string;
    created: Date;
}

export interface ArticleContent {
    title: string;
    path: string;
    author: string;
    content: string;
}