import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompControlComponent } from './comp-control.component';

describe('CompControlComponent', () => {
  let component: CompControlComponent;
  let fixture: ComponentFixture<CompControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
