import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MonetaryFund, MonetaryFundService } from '../../../../services/monetary-fund.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fondo-monetario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fondo-monetario.component.html',
  styleUrl: './fondo-monetario.component.scss'
})
export class FondoMonetarioComponent {
  form: FormGroup;
  funds: MonetaryFund[] = [];
  editing = false;
  currentId?: number;

  constructor(private fb: FormBuilder, private svc: MonetaryFundService) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFunds();
  }

  loadFunds(): void {
    this.svc.getAll().subscribe(data => this.funds = data);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const fund: MonetaryFund = { name: this.form.value.name };

    if (this.editing && this.currentId != null) {
      fund.id = this.form.value.id;
      fund.name = this.form.value.name;
      this.svc.update(this.currentId, fund).subscribe(() => {
        this.resetForm();
        this.loadFunds();
      });
    } else {
      this.svc.create(fund).subscribe(() => {
        this.resetForm();
        this.loadFunds();
      });
    }
  }

  editFund(fund: MonetaryFund): void {
    this.editing = true;
    this.currentId = fund.id;
    this.form.patchValue({ id: fund.id, name: fund.name });
  }

  deleteFund(id: number): void {
    if (confirm('¿Estás seguro de eliminar este fondo?')) {
      this.svc.delete(id).subscribe(() => this.loadFunds());
    }
  }

  resetForm(): void {
    this.form.reset();
    this.editing = false;
    this.currentId = undefined;
  }

}
