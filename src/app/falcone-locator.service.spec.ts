import { TestBed } from '@angular/core/testing';

import { FalconeLocatorService } from './falcone-locator.service';

describe('FalconeLocatorService', () => {
  let service: FalconeLocatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FalconeLocatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
