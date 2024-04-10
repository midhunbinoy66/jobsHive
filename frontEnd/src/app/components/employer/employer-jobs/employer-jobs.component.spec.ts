import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerJobsComponent } from './employer-jobs.component';

describe('EmployerJobsComponent', () => {
  let component: EmployerJobsComponent;
  let fixture: ComponentFixture<EmployerJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerJobsComponent]
    });
    fixture = TestBed.createComponent(EmployerJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
