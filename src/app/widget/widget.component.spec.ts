import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Widget } from './widget.component';

describe('WidgetComponent', () => {
  let component: Widget;
  let fixture: ComponentFixture<Widget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Widget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Widget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
