import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
//import { BooksModule } from './routers/books/books.module';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DemoComponent } from './demo/demo.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NotFoundComponent,
    DemoComponent
  ],
  imports: [  //注意导入模块的顺序1
    BrowserModule,
    //BooksModule, 使用了惰性加载
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
