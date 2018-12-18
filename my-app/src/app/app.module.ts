import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from "@angular/forms"
import { FormsModule} from "@angular/forms"
import { HttpClientModule} from "@angular/common/http"

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from "./hero.service";
import { MessageService} from "./message.service"
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SizeComponent } from './size/size.component';
import { DynamicOneComponent } from './dynamic-one/dynamic-one.component';
import { DynamicTwoComponent } from './dynamic-two/dynamic-two.component';
import { AdDirectiveDirective } from './ad-directive.directive';
import { AdBannerComponent } from './ad-banner/ad-banner.component';
import { AdServiceService } from "./ad-service.service";
import { CustomDirective } from './custom.directive';
import { CustomUnlessDirective } from './custom-unless.directive';
import { MyPipePipe } from './my-pipe.pipe';
import { FesponsiveFormExampleComponent } from './fesponsive-form-example/fesponsive-form-example.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { MyValidationComponent } from './my-validation/my-validation.component';
import { MyValidationTwoDirective } from './my-validation-two.directive';
import { MyDirective } from './directive/my.directive';
import { FormValidationAsyncComponent } from './directive/form-validation-async/form-validation-async.component';
import { DynamicFormExampleComponent } from './dynamic-form-example/dynamic-form-example/dynamic-form-example.component';
import { HttpTestComponent} from "./http-test/http-test.component";
import { HttpTestSService } from "./service/http-test-s.service"

import { httpInterceptorProviders} from "./http-interceptors/http-interceptors"; // 拦截器的总文件(所有本应用的拦截器都会放在这个文件里)
//import { MyValidationDirective } from './my-validation.directive'
@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessageComponent,
    DashboardComponent,
    SizeComponent,
    DynamicOneComponent,
    DynamicTwoComponent,
    AdDirectiveDirective,
    AdBannerComponent,
    CustomDirective,
    CustomUnlessDirective,
    MyPipePipe,
    FesponsiveFormExampleComponent,
    TemplateDrivenFormComponent,
    FormValidationComponent,
    MyValidationComponent,
    MyValidationTwoDirective,
    MyDirective,
    FormValidationAsyncComponent,
    DynamicFormExampleComponent,
    HttpTestComponent,
    //MyValidationDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HeroService,MessageService,AdServiceService,HttpTestSService,httpInterceptorProviders],
  entryComponents: [DynamicOneComponent,DynamicTwoComponent],
  bootstrap: [AppComponent] // 应用的启动点
})
export class AppModule { }
