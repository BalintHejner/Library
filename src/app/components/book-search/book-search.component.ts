import { Component } from '@angular/core';
import { BookSearchModel } from '../../models/book-search.model';
import { BookModel } from '../../models/book.model';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrl: './book-search.component.css'
})
export class BookSearchComponent {

  searchModel: BookSearchModel = {
    author: '',
    isbn: '',
    title: '',
    count: 20,
    from: 1
  };

  books: BookModel[] = [];

  pager = {
    visible: false,
    first: false,
    previous: false,
    next: false,
    last: false,
    page: 1,
    totalCount: 0
  }
  constructor(private httpService: HttpService) {}

  search() {
    this.searchModel.from = 1;
    this.getBooks();
  }

  setPager(totalCount: number) {
    this.pager.first = this.searchModel.from != 1;
    this.pager.previous = this.searchModel.from != 1;
    this.pager.last = this.searchModel.from + this.books.length < totalCount;
    this.pager.next = this.searchModel.from + this.books.length < totalCount;
    this.pager.page = Math.floor((this.searchModel.from - 1) / this.searchModel.count) + 1;
    this.pager.visible = this.books.length < totalCount;
    this.pager.totalCount = totalCount;
  }

  pagerFirst() {
    this.searchModel.from = 1;
    this.getBooks();
  }

  pagerNext() {
    this.searchModel.from += this.searchModel.count;
    this.getBooks();
  }

  pagerPrevious() {
    this.searchModel.from -= this.searchModel.count;
    if (this.searchModel.from < 1) {
      this.searchModel.from = 1;
    }
    this.getBooks(); 
  }

  pagerLast() {
    this.searchModel.from = Math.floor(this.pager.totalCount / this.searchModel.count) * this.searchModel.count + 1;
    this.getBooks();
  }

  getBooks() {
    this.books = [];
    this.httpService.listBooks(this.searchModel).subscribe({
      next: (result: {totalCount: number, books: BookModel[]}) => {
        this.books = result.books;        
        this.setPager(result.totalCount);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
