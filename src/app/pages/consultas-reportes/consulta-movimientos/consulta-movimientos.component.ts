import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { BudgetVsExecution, ReportService } from '../../../services/report.service';

@Component({
  selector: 'app-consulta-movimientos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consulta-movimientos.component.html',
  styleUrls: ['./consulta-movimientos.component.scss']
})
export class ConsultaMovimientosComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  movements: BudgetVsExecution[] = [];
  expenseTypes = [
    { id: 1, name: 'Transporte' },
    { id: 2, name: 'Alimentación' },
    { id: 3, name: 'Salud' },
    { id: 4, name: 'Educación' },
    { id: 5, name: 'Entretenimiento' }
  ];
  isLoading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private svc: ReportService) {
    this.form = this.fb.group({
      dateFrom: ['', Validators.required],
      dateTo: ['', Validators.required]
    });
  }

  ngOnInit() { }

  getExpenseTypeName(id: number): string {
    return this.expenseTypes.find(e => e.id === id)?.name || 'Desconocido';
  }


  search() {
    if (this.form.invalid) return;
    const { dateFrom, dateTo } = this.form.value;
    this.svc.getBudgetVsExecution(dateFrom, dateTo).subscribe(data => {
      this.movements = data;
      console.log('Movimientos obtenidos:', this.movements);
      this.isLoading = true;
    });
  }
}
