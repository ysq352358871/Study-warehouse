import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validators, AbstractControl } from "@angular/forms"

@Directive({
  selector: '[appMyValidationTwo]',
  providers:[{provide: NG_VALIDATORS, useExisting: MyValidationTwoDirective, multi: true}]
})
export class MyValidationTwoDirective implements Validators{
  constructor() { }
  @Input('appMyValidationTwo') forbiddenName:string;

  validate(contrl: AbstractControl): {[key:string]:any} | null{
    return this.forbiddenName ? (this.forbiddenName === contrl.value?{'forbiddenName':contrl.value} :null) : null;
  }

}
