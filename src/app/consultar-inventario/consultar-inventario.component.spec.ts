import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarInventarioComponent } from './consultar-inventario.component';

describe('ConsultarInventarioComponent', () => {
  let component: ConsultarInventarioComponent;
  let fixture: ComponentFixture<ConsultarInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultarInventarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultarInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
