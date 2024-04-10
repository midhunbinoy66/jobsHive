import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobEditComponent } from './employer-job-edit.component';

describe('EmployerJobEditComponent', () => {
  let component: EmployerJobEditComponent;
  let fixture: ComponentFixture<EmployerJobEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerJobEditComponent]
    });
    fixture = TestBed.createComponent(EmployerJobEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
