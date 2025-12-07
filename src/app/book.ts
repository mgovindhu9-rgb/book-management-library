import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private api = 'http://localhost:3000/books';

  constructor(private http: HttpClient) {}

  // GET all books
  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  // GET book by ID
  getBookById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  addBook(book: any): Observable<any> {
    return this.http.post<any>(this.api, book, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // PUT update book
  updateBook(book: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${book.id}`, book);
  }

  // DELETE book
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}

// **this part explain where to where connection why ?
