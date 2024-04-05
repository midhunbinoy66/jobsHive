import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSavedJobsComponent } from './user-saved-jobs.component';

describe('UserSavedJobsComponent', () => {
  let component: UserSavedJobsComponent;
  let fixture: ComponentFixture<UserSavedJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSavedJobsComponent]
    });
    fixture = TestBed.createComponent(UserSavedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
