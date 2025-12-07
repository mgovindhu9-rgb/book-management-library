import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookService } from '../book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './book-form.html',
  styleUrls: ['./book-form.scss'],
})
export class BookFormComponent {
  id: number | null = null;
  title: string = '';
  author: string = '';
  publishedDate: string = '';
  price: number = 0;
  description: string = '';
  isEdit: boolean = false;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId) {
      this.id = Number(routeId);
      this.isEdit = true;

      // ⭐ IMPORTANT: Subscribe to Observable
      this.bookService.getBookById(this.id).subscribe((book) => {
        this.id = book.id;
        this.title = book.title;
        this.author = book.author;
        this.publishedDate = book.publishedDate;
        this.price = book.price;
        this.description = book.description;
      });
    }
  }

  saveBook() {
    if (!this.title || !this.author || !this.publishedDate) {
      alert('Please fill all fields');
      return;
    }

    if (this.isEdit) {
      // UPDATE (PUT)
      const updatedBook = {
        id: this.id,
        title: this.title,
        author: this.author,
        publishedDate: this.publishedDate,
        price: this.price,
        description: this.description,
      };

      this.bookService.updateBook(updatedBook).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      // ADD (POST) — NO ID HERE!
      const newBook = {
        id: this.id,
        title: this.title,
        author: this.author,
        publishedDate: this.publishedDate,
        price: this.price,
        description: this.description,
      };

      this.bookService.addBook(newBook).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
