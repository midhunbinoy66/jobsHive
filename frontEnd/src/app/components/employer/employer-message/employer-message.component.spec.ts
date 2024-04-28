import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerMessageComponent } from './employer-message.component';

describe('EmployerMessageComponent', () => {
  let component: EmployerMessageComponent;
  let fixture: ComponentFixture<EmployerMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployerMessageComponent]
    });
    fixture = TestBed.createComponent(EmployerMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
