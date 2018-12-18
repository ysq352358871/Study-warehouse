import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router" // 导入路由模块

import { HeroesComponent } from "./heroes/heroes.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { HttpTestComponent } from "./http-test/http-test.component";
import { FormValidationComponent } from "./form-validation/form-validation.component"
import { TemplateDrivenFormComponent } from "./template-driven-form/template-driven-form.component";
import { FesponsiveFormExampleComponent } from "./fesponsive-form-example/fesponsive-form-example.component"
import { FormValidationAsyncComponent} from "./directive/form-validation-async/form-validation-async.component"
import { DynamicFormExampleComponent } from "./dynamic-form-example/dynamic-form-example/dynamic-form-example.component"

const routes: Routes = [
  {path:'heroes',component:HeroesComponent},
  {path:'',redirectTo:"/dashboard",pathMatch:'full'}, //设置路由默认link
  {path:'dashboard', component: DashboardComponent},
  {path:'httpTest', component: HttpTestComponent},
  {path:'formValidation', component:FormValidationComponent},
  {path:'fesponsive', component:FesponsiveFormExampleComponent},
  {path:'templateDriven', component:TemplateDrivenFormComponent},
  {path:'dynamicFormExample', component: DynamicFormExampleComponent},
  {path:'formValidationAsync', component: FormValidationAsyncComponent},
];

@NgModule({
    exports:[RouterModule],
    imports:[RouterModule.forRoot(routes)]
})


export class AppRoutingModule { }
