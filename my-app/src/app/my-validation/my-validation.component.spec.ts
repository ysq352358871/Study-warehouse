import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyValidationComponent } from './my-validation.component';

describe('MyValidationComponent', () => {
  let component: MyValidationComponent;
  let fixture: ComponentFixture<MyValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
