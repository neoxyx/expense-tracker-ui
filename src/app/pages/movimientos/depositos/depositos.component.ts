import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DepositService, DepositRequest } from '../../../services/deposit.service';
import { MonetaryFundService } from '../../../services/monetary-fund.service';

@Component({
  selector: 'app-depositos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './depositos.component.html',
  styleUrls: ['./depositos.component.scss']
})
export class DepositosComponent {
  form: ReturnType<FormBuilder['group']>;

  isLoading = false;
  successMsg = '';
  errorMsg = '';

  funds: any;


  constructor(private fb: FormBuilder, private svc: DepositService, private fundService: MonetaryFundService
  ) {
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      monetaryFundId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }
  ngOnInit(): void {
    this.fundService.getFunds().subscribe({
      next: res => {
        this.funds = res.data;
      },
      error: err => console.error('Error al cargar fondos', err)
    });
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.successMsg = '';
    this.errorMsg = '';

    const formValue = this.form.value;
    const req: DepositRequest = {
      MonetaryFundId: formValue.monetaryFundId!,
      Amount: formValue.amount!,
      Date: formValue.date!,
    };

    this.svc.createDeposit(req).subscribe({
      next: res => {
        this.isLoading = false;
        this.successMsg = res.message;
        this.form.reset({
          date: new Date().toISOString().substring(0, 10)
        });
      },
      error: err => {
        this.isLoading = false;
        this.errorMsg = err.error?.message || 'Error al registrar el depósito.';
      }
    });
  }
}
