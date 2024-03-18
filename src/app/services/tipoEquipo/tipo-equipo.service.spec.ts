import { TestBed } from '@angular/core/testing';

import { TipoEquipoService } from './tipo-equipo.service';

describe('TipoEquipoService', () => {
  let service: TipoEquipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEquipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
