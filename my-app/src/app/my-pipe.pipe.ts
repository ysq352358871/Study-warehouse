import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myPipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: number, args?: string): number {  //value: 输入管道的值(要处理的值)。args：管道的参数
    let val = parseFloat(args);
    return Math.pow(value, isNaN(val) ? 1 : val);
  }

}
