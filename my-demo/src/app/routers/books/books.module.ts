/**
 * Book 模块根文件
 *
 * */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { FormsModule } from '@angular/forms';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookComponent } from './book/book.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BooksRoutingModule
  ],
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookComponent
  ]
})
export class BooksModule { }
