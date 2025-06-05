import { Component, OnInit } from '@angular/core';
import { ReportService, BudgetVsExpense } from '../../../services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-presupuesto',
  imports: [CommonModule],
  templateUrl: './presupuesto.component.html',
  styleUrl: './presupuesto.component.scss'
})
export class PresupuestoComponent {
  data: BudgetVsExpense[] = [];
  loading = true;
  error = '';

  expenseTypes = [
    { id: 1, name: 'Transporte' },
    { id: 2, name: 'Alimentación' }
  ];

  constructor(private reportService: ReportService) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;

    // Simula una respuesta del backend (reemplaza con llamada real)
    const mockResponse = [
      { expenseTypeId: 1, budgeted: 0, spent: 100000.0, remaining: -100000.0 },
      { expenseTypeId: 2, budgeted: 0, spent: 600000.0, remaining: -600000.0 }
    ];

    // Asocia el nombre del tipo de gasto
    this.data = mockResponse.map(item => {
      const type = this.expenseTypes.find(t => t.id === item.expenseTypeId);
      return {
        ...item,
        expenseTypeName: type ? type.name : `Tipo ${item.expenseTypeId}`
      };
    });

    this.loading = false;
  }
}
