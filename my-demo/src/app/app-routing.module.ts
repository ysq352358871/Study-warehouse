/**
 * 路由的总文件
 *
 * */
import { NgModule } from '@angular/core';
import {RouterModule,Routes } from '@angular/router'
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { NotFoundComponent } from "./component/not-found/not-found.component"
const appsRoute:Routes = [
  {path:'dashboard', component:DashboardComponent},
  {
    path: 'book',
    loadChildren: './routers/books/books.module#BooksModule',
  },
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  { path: '**', component: NotFoundComponent }  //这是通配路由
  ];




@NgModule({
  imports: [
    RouterModule.forRoot(appsRoute,{useHash:true}) //,{enableTracing:true} enableTracing:true: 用于Debug
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
