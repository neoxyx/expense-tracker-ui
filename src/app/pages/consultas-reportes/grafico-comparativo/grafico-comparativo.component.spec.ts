import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoComparativoComponent } from './grafico-comparativo.component';

describe('GraficoComparativoComponent', () => {
  let component: GraficoComparativoComponent;
  let fixture: ComponentFixture<GraficoComparativoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoComparativoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoComparativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
