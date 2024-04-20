import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToWalletComponent } from './add-to-wallet.component';

describe('AddToWalletComponent', () => {
  let component: AddToWalletComponent;
  let fixture: ComponentFixture<AddToWalletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddToWalletComponent]
    });
    fixture = TestBed.createComponent(AddToWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
