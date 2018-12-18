import { Component, Input} from '@angular/core';
import { AdInterface } from "../ad-interface";

@Component({
  selector: 'app-dynamic-two',
  templateUrl: './dynamic-two.component.html',
  styleUrls: ['./dynamic-two.component.css']
})
export class DynamicTwoComponent implements AdInterface {
  @Input() data;
  constructor() { }



}
