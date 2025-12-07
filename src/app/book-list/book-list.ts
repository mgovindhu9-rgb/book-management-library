import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { BookService } from '../book';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../book-item/book-item';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, BookItemComponent],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss'],
})
export class BookListComponent {
  books: any[] = [];
  loading = true;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
      this.loading = false;
    });
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks(); // reload after deletion
      });
    }
  }

  handleViewBook(id: any) {
    this.router.navigate(['/details', id]);
  }

  addBook() {
    this.router.navigate(['/add']);
  }
  editBook(id: number) {
    this.router.navigate(['/edit', id]);
  }
}
