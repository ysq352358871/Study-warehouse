import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.css']
})
export class SizeComponent implements OnInit {
  @Input() size:number;
  @Output() sizeChange = new EventEmitter<number>();
  constructor() { }

  dec(){
    this.resize(-1);
  }
  inc(){
    this.resize(+1);
  }
  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }
  ngOnInit() {
  }

}
