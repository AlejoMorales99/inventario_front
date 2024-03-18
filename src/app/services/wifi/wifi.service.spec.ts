import { TestBed } from '@angular/core/testing';

import { WifiService } from './wifi.service';

describe('WifiService', () => {
  let service: WifiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
