import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechResultsComponent } from './speech-results.component';

describe('SpeechResultsComponent', () => {
  let component: SpeechResultsComponent;
  let fixture: ComponentFixture<SpeechResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
