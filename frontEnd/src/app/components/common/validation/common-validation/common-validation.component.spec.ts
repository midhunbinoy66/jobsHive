import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonValidationComponent } from './common-validation.component';

describe('CommonValidationComponent', () => {
  let component: CommonValidationComponent;
  let fixture: ComponentFixture<CommonValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonValidationComponent]
    });
    fixture = TestBed.createComponent(CommonValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
