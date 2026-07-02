import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserForResumeComponent } from './select-user-for-resume.component';

describe('SelectUserForResumeComponent', () => {
  let component: SelectUserForResumeComponent;
  let fixture: ComponentFixture<SelectUserForResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SelectUserForResumeComponent]
    });
    fixture = TestBed.createComponent(SelectUserForResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
