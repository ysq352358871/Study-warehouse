/**
 * Book 模块的路由配置文件
 * */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from "./book/book.component"
import { BookListComponent } from "./book-list/book-list.component";
import { BookDetailComponent } from "./book-detail/book-detail.component";
const routes: Routes = [
  {
    path:'',
    component:BookComponent,
    children:[
          {
            path:'', component:BookListComponent
          },
          {
            path:'bookDetail/:id', component:BookDetailComponent
          }
    ]

  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
