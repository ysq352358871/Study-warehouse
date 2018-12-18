import { Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appCustomUnless]'
})
export class CustomUnlessDirective {
  //TemplateRef取得 <ng-template> 的内容。ViewContainerRef来访问这个视图容器
  constructor(private templateRef:TemplateRef<any>,private viewContainerRef:ViewContainerRef) { }
  private hasView = false;
  @Input() set appCustomUnless(condition: boolean){
      if(!condition && !this.hasView){ //为假时创建视图
          this.viewContainerRef.createEmbeddedView(this.templateRef);
          this.hasView = true;
      }else if(condition && this.hasView){ // 为真时销毁视图
        this.viewContainerRef.clear();
        this.hasView = false;
      }
  }
}
