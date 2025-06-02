import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrosGastosComponent } from './registros-gastos.component';

describe('RegistrosGastosComponent', () => {
  let component: RegistrosGastosComponent;
  let fixture: ComponentFixture<RegistrosGastosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrosGastosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrosGastosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
