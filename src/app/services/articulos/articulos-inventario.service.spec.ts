import { TestBed } from '@angular/core/testing';

import { ArticulosInventarioService } from './articulos-inventario.service';

describe('ArticulosInventarioService', () => {
  let service: ArticulosInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
