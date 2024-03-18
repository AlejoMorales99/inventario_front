import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodosComponent } from './nodos.component';

describe('NodosComponent', () => {
  let component: NodosComponent;
  let fixture: ComponentFixture<NodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
