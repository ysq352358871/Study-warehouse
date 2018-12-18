import { Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appCustom]'
})
export class CustomDirective {

  constructor(private el:ElementRef) { // el 为private
    //el.nativeElement.style.backgroundColor = 'red';
  }
  @Input('appCustom') highLightColor:string;  // 设置appCustom 别名。这里把属性指令名和接受参数输入的属性名设置成了一样的。
  @Input() defaultColor: String; // 可以为指令设置多个属性
  @HostListener('mouseenter') onMouseEnter(){
    this.highLight(this.highLightColor || "yellow");
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.highLight(null);
  }
  @HostListener('click') onClick(){
    this.highLight('red')
  }
  private highLight(color:string){
    this.el.nativeElement.style.backgroundColor = color;
  }
}
