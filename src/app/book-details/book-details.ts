import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BookService } from '../book';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterModule],
  templateUrl: './book-details.html',
  styleUrls: ['./book-details.scss'],
})
export class BookDetailsComponent {
  book: any;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];

    this.bookService.getBookById(id).subscribe(
      (data) => {
        this.book = data;
        this.cdr.detectChanges();
        if (this.book.published_date) {
          this.book.published_date = new Date(this.book.published_date);
        }
      },
      (error) => {
        console.log('Error fetching book details');
      }
    );
  }
}
