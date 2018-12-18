import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from "@angular/forms"
import { forbiddenNameValidator} from "../my-validation.directive"

import {TemplateFormExample } from "../template-form-example";
@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent implements OnInit {

  constructor(private fb:FormBuilder) {
  }

  hero = new TemplateFormExample(12,'张三','运维',"");


  //响应式模板验证器
  /**
   * forbiddenNameValidator(): 为自定义的响应式表单验证器 详情见：my-validation.directive文件
   * */
  profileForm = this.fb.group({
    nameTwo : ['Bob',
      [Validators.required,Validators.minLength(2),forbiddenNameValidator("Patrick")]
    ],
      id : [123,Validators.required]
  });

  get id(){
    return this.profileForm.get('id');
  }
  get nameTwo(){
    return this.profileForm.get('nameTwo');
  }




  ngOnInit() {
  }

}
