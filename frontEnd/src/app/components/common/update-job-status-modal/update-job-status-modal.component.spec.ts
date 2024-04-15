import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobStatusModalComponent } from './update-job-status-modal.component';

describe('UpdateJobStatusModalComponent', () => {
  let component: UpdateJobStatusModalComponent;
  let fixture: ComponentFixture<UpdateJobStatusModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateJobStatusModalComponent]
    });
    fixture = TestBed.createComponent(UpdateJobStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
