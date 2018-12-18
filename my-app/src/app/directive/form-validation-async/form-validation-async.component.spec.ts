import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormValidationAsyncComponent } from './form-validation-async.component';

describe('FormValidationAsyncComponent', () => {
  let component: FormValidationAsyncComponent;
  let fixture: ComponentFixture<FormValidationAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormValidationAsyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormValidationAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
