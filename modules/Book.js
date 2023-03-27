export class Book {
  constructor(title, author) {
    this.id = Date.now();
    this.title = title;
    this.author = author;
    this.description = `Lorem ipsum dolor sit amet 
      consectetur adipisicing elit. Velit
      earum saepe fugiat!`;
    this.cover = `assets/book.png`;
  }
}
