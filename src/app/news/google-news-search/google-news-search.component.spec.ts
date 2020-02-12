import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleNewsSearchComponent } from './google-news-search.component';

describe('GoogleNewsSearchComponent', () => {
  let component: GoogleNewsSearchComponent;
  let fixture: ComponentFixture<GoogleNewsSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleNewsSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleNewsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
