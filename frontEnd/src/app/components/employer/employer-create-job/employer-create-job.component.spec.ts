import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerCreateJobComponent } from './employer-create-job.component';

describe('EmployerCreateJobComponent', () => {
  let component: EmployerCreateJobComponent;
  let fixture: ComponentFixture<EmployerCreateJobComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerCreateJobComponent]
    });
    fixture = TestBed.createComponent(EmployerCreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
