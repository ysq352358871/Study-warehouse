import { Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appAdDirective]'
})
export class AdDirectiveDirective {

  constructor(public viewContainerRef:ViewContainerRef) { }

}
