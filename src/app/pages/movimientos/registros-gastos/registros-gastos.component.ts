import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormArray, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ExpenseService, ExpenseRequest, OverrunAlert } from '../../../services/expense.service';
import { MonetaryFundService } from '../../../services/monetary-fund.service';

@Component({
  selector: 'app-registros-gastos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registros-gastos.component.html',
  styleUrls: ['./registros-gastos.component.scss']
})
export class RegistrosGastosComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;

  // datos para selects (ideales provistos por otros endpoints)
  funds: any;
  expenseTypes = [ { id:1, name:'Transporte' }, { id:2, name:'Alimentación' } ];

  alerts: OverrunAlert[] = [];
  isLoading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private svc: ExpenseService,  private fundService: MonetaryFundService) {
    this.form = this.fb.group({
      Date: [new Date().toISOString().substring(0,10), Validators.required],
      MonetaryFundId: [null, Validators.required],
      Observations: [''],
      CommerceName: ['', Validators.required],
      DocumentType: ['Comprobante', Validators.required],
      Details: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.addDetail();
    this.fundService.getFunds().subscribe({
      next: res => {
        this.funds = res.data;
      },
      error: err => console.error('Error al cargar fondos', err)
    });
  }

  get Details() { return this.form.get('Details') as FormArray; }

  addDetail() {
    this.Details.push(this.fb.group({
      ExpenseTypeId: [null, Validators.required],
      Amount: [0, [Validators.required, Validators.min(0.01)]]
    }));
  }

  removeDetail(i: number) {
    this.Details.removeAt(i);
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.alerts = [];
    const req: ExpenseRequest = this.form.value;
    this.svc.createExpense(req).subscribe({
      next: res => {
        this.isLoading = false;
        if (res.code === 200) {
          this.alerts = res.alerts;
          if (this.alerts.length === 0) {
            alert('Gasto registrado correctamente.');
            this.form.reset({
              Date: new Date().toISOString().substring(0,10),
              DocumentType: 'Comprobante'
            });
            this.Details.clear();
            this.addDetail();
          }
        } else {
          this.errorMsg = res.message;
        }
      },
      error: err => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Error al guardar.';
      }
    });
  }
}
