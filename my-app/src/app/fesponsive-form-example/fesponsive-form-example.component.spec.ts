import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FesponsiveFormExampleComponent } from './fesponsive-form-example.component';

describe('FesponsiveFormExampleComponent', () => {
  let component: FesponsiveFormExampleComponent;
  let fixture: ComponentFixture<FesponsiveFormExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FesponsiveFormExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FesponsiveFormExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
