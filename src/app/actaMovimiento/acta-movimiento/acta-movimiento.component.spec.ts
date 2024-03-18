import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActaMovimientoComponent } from './acta-movimiento.component';

describe('ActaMovimientoComponent', () => {
  let component: ActaMovimientoComponent;
  let fixture: ComponentFixture<ActaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActaMovimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
