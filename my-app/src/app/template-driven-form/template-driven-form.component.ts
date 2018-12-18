import { Component, OnInit } from '@angular/core';
import {TemplateFormExample} from "../template-form-example";
@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})
export class TemplateDrivenFormComponent implements OnInit {

  constructor() { }
  work = ['运营','商务','运维','前端工程师','PHP工程师',"JAVA工程师"];
  model = new TemplateFormExample(12,'张三',this.work[0],"上海市");

  get correctionData(){ // 通过getter 定义correctionData属性。
    return JSON.stringify(this.model);
  }

  submitted = false;
  onSubmit (){
    this.submitted = true;
  }

  ngOnInit() {
  }

}
