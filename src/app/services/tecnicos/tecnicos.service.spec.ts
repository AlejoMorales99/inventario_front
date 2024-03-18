import { TestBed } from '@angular/core/testing';

import { TecnicosService } from './tecnicos.service';

describe('TecnicosService', () => {
  let service: TecnicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TecnicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
