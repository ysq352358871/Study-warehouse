
import {ValidatorFn, AbstractControl} from "@angular/forms"

//响应式表单自定义模板验证器
export function forbiddenNameValidator(name:string):ValidatorFn{
    return (contrl:AbstractControl): {[key: string]: any} | null=>{
      const forbidden = name === contrl.value;
      return forbidden ? {'forbiddenName': {value: contrl.value}} : null;
    }
  }


