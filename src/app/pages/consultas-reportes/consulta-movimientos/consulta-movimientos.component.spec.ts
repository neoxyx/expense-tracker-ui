import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaMovimientosComponent } from './consulta-movimientos.component';

describe('ConsultaMovimientosComponent', () => {
  let component: ConsultaMovimientosComponent;
  let fixture: ComponentFixture<ConsultaMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaMovimientosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
