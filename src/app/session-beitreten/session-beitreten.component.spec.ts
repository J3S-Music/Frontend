import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionBeitretenComponent } from './session-beitreten.component';

describe('SessionBeitretenComponent', () => {
  let component: SessionBeitretenComponent;
  let fixture: ComponentFixture<SessionBeitretenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionBeitretenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionBeitretenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
