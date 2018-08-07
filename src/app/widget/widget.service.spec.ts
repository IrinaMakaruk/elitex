import { TestBed, inject } from '@angular/core/testing';

import { WidgetService } from './widget.service';

import { HttpClientModule } from '@angular/common/http';

describe('WidgetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WidgetService],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([WidgetService], (service: WidgetService) => {
    expect(service).toBeTruthy();
  }));
});
