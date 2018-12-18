import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray} from "@angular/forms";
import { Observable} from "rxjs/Observable"
@Component({
  selector: 'app-fesponsive-form-example',
  templateUrl: './fesponsive-form-example.component.html',
  styleUrls: ['./fesponsive-form-example.component.css']
})
export class FesponsiveFormExampleComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  //创建单个form 表单
  name = new FormControl('张三');
  updateName(){
    this.name.setValue("郝转转");
  }

  /* //使用 formGroup
  profileName = new FormGroup({
    firstName : new FormControl(""),
    lastName : new FormControl(""),
    address : new FormGroup({ //嵌套的表单组
      city : new FormControl(""),
      zipCode : new FormControl("")
    })
  }); */

  /**
   * 使用FormBuilder 来生成表单控件
   *
   * */
  profileName = this.fb.group({
    firstName : ['',Validators.required], //如果你的控件还需要同步或异步验证器，那就在这个数组中的第二项和第三项提供同步和异步验证器
    lastName : [''],
    address : this.fb.group({
      city : [''],
      zipCode : ['']
    }),
    aliases : this.fb.array([ // fb 的array 方法 对应 formArray.
      this.fb.control(''),
    ])
  });

  get aliases(){ // 通过getter 访问控件
    // 通过profileName.get() 获取formArray的值
    return this.profileName.get('aliases') as FormArray;
    // as FormArray: 是进行数据显示转化。因为返回的控件的类型是 AbstractControl，所以你要为该方法提供一个显式的类型声明来访问 FormArray 特有的语法。
  }

  addAliases(){
    this.aliases.push(this.fb.control(""));
  }

  onsubmit(){
    console.warn(this.profileName.value);
    this.profileName.patchValue({
      firstName : '杨胜千',
      address:{
        city:'上海'
      }
    })
  }


  ngOnInit() {
  }

}
