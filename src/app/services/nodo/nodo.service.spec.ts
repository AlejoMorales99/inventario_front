import { TestBed } from '@angular/core/testing';

import { NodoService } from './nodo.service';

describe('NodoService', () => {
  let service: NodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
