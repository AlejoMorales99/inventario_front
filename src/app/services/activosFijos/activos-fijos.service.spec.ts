import { TestBed } from '@angular/core/testing';

import { ActivosFijosService } from './activos-fijos.service';

describe('ActivosFijosService', () => {
  let service: ActivosFijosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivosFijosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
