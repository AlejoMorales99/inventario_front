import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNodoComponent } from './editar-nodo.component';

describe('EditarNodoComponent', () => {
  let component: EditarNodoComponent;
  let fixture: ComponentFixture<EditarNodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarNodoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
