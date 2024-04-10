import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryValidationComponent } from './salary-validation.component';

describe('SalaryValidationComponent', () => {
  let component: SalaryValidationComponent;
  let fixture: ComponentFixture<SalaryValidationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryValidationComponent]
    });
    fixture = TestBed.createComponent(SalaryValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
