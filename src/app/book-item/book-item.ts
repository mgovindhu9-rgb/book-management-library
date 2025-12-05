import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-item.html',
  styleUrls: ['./book-item.scss']
})
export class BookItemComponent {

  @Input() book: any;  // Parent → Child
  @Output() view = new EventEmitter<number>(); // Child → Parent

  openDetails() {
    this.view.emit(this.book.id);
  }
}
