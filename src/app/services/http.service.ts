import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookSearchModel } from '../models/book-search.model';
import { Observable, map } from 'rxjs';
import { BookModel } from '../models/book.model';
import { MemberModel } from '../models/member.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  APIUrl = 'https://library.jedlik.cloud';

  constructor(private http: HttpClient) { }

  listBooks(searchModel: BookSearchModel): Observable<{totalCount: number, books: BookModel[]}> {
    let url = `${this.APIUrl}/books?from=${searchModel.from}&count=${searchModel.count}`;
    if (searchModel.author) {
      url += `&author=${searchModel.author}`;
    }
    if (searchModel.title) {
      url += `&title=${searchModel.title}`;
    }
    if (searchModel.isbn) {
      url += `&isbn=${searchModel.isbn}`;
    }
    return this.http.get<BookModel[]>(url, {observe: 'response'}).pipe(
      map( result => {
        if (result.body) {
          return {
            totalCount: Number(result.headers.get('x-total-count')),
            books: result.body
          }
        } else {
          return {totalCount: 0, books: []}
        }
      }));
  }


  memberList(name: string): Observable<MemberModel[]> {
    return this.http.get<MemberModel[]>(`${this.APIUrl}/members/find?name=${name}`)
  }

  newMember(model: MemberModel): Observable<MemberModel> {
    return this.http.post<MemberModel>(`${this.APIUrl}/members/new`, model);
  }
}
