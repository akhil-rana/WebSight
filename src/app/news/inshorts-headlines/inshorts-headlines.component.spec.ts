import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InshortsHeadlinesComponent } from './inshorts-headlines.component';

describe('InshortsHeadlinesComponent', () => {
  let component: InshortsHeadlinesComponent;
  let fixture: ComponentFixture<InshortsHeadlinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InshortsHeadlinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InshortsHeadlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
