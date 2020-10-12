import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionErstellenComponent } from './session-erstellen.component';

describe('SessionErstellenComponent', () => {
  let component: SessionErstellenComponent;
  let fixture: ComponentFixture<SessionErstellenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionErstellenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionErstellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
