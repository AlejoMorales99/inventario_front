import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTipoDeEquipoComponent } from './editar-tipo-de-equipo.component';

describe('EditarTipoDeEquipoComponent', () => {
  let component: EditarTipoDeEquipoComponent;
  let fixture: ComponentFixture<EditarTipoDeEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarTipoDeEquipoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarTipoDeEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
