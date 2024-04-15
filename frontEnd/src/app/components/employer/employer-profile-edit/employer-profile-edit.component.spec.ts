import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileEditComponent } from './employer-profile-edit.component';

describe('EmployerProfileEditComponent', () => {
  let component: EmployerProfileEditComponent;
  let fixture: ComponentFixture<EmployerProfileEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerProfileEditComponent]
    });
    fixture = TestBed.createComponent(EmployerProfileEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
