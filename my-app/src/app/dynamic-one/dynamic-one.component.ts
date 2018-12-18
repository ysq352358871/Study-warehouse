import { Component, Input} from '@angular/core';
import { AdInterface} from "../ad-interface";

@Component({
  selector: 'app-dynamic-one',
  templateUrl: './dynamic-one.component.html',
  styleUrls: ['./dynamic-one.component.css']
})
export class DynamicOneComponent implements AdInterface {
  @Input() data;
  constructor() { }



}
