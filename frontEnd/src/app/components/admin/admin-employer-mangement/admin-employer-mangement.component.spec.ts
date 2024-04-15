import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmployerMangementComponent } from './admin-employer-mangement.component';

describe('AdminEmployerMangementComponent', () => {
  let component: AdminEmployerMangementComponent;
  let fixture: ComponentFixture<AdminEmployerMangementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEmployerMangementComponent]
    });
    fixture = TestBed.createComponent(AdminEmployerMangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
