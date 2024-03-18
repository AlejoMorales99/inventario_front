import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActivoFijoComponent } from './editar-activo-fijo.component';

describe('EditarActivoFijoComponent', () => {
  let component: EditarActivoFijoComponent;
  let fixture: ComponentFixture<EditarActivoFijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarActivoFijoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarActivoFijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
