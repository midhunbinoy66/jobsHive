import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerWalletComponent } from './employer-wallet.component';

describe('EmployerWalletComponent', () => {
  let component: EmployerWalletComponent;
  let fixture: ComponentFixture<EmployerWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerWalletComponent]
    });
    fixture = TestBed.createComponent(EmployerWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
