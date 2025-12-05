import { Routes } from '@angular/router';

import { BookListComponent } from './book-list/book-list';
import { BookDetailsComponent } from './book-details/book-details';
import { BookFormComponent } from './book-form/book-form';

export const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'details/:id', component: BookDetailsComponent },
  { path: 'add', component: BookFormComponent },
  { path: 'edit/:id', component: BookFormComponent }

];
