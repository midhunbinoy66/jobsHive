import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerApplicanResumeComponent } from './employer-applican-resume.component';

describe('EmployerApplicanResumeComponent', () => {
  let component: EmployerApplicanResumeComponent;
  let fixture: ComponentFixture<EmployerApplicanResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerApplicanResumeComponent]
    });
    fixture = TestBed.createComponent(EmployerApplicanResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
