import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarWifiComponent } from './editar-wifi.component';

describe('EditarWifiComponent', () => {
  let component: EditarWifiComponent;
  let fixture: ComponentFixture<EditarWifiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarWifiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarWifiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
