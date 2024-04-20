import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPaymentComponent } from './employer-payment.component';

describe('EmployerPaymentComponent', () => {
  let component: EmployerPaymentComponent;
  let fixture: ComponentFixture<EmployerPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerPaymentComponent]
    });
    fixture = TestBed.createComponent(EmployerPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
