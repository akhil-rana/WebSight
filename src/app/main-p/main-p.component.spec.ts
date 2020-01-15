import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPComponent } from './main-p.component';

describe('MainPComponent', () => {
  let component: MainPComponent;
  let fixture: ComponentFixture<MainPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
