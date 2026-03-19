import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSession } from './video-session';

describe('VideoSession', () => {
  let component: VideoSession;
  let fixture: ComponentFixture<VideoSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoSession],
    }).compileComponents();

    fixture = TestBed.createComponent(VideoSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
