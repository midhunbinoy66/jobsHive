import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobVerifyModalComponent } from './job-verify-modal.component';

describe('JobVerifyModalComponent', () => {
  let component: JobVerifyModalComponent;
  let fixture: ComponentFixture<JobVerifyModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobVerifyModalComponent]
    });
    fixture = TestBed.createComponent(JobVerifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
