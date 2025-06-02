import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ReportService, BudgetVsExecution } from '../../../services/report.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-grafico-comparativo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grafico-comparativo.component.html',
  styleUrls: ['./grafico-comparativo.component.scss']
})
export class GraficoComparativoComponent implements OnInit {
  form: ReturnType<FormBuilder['group']>;
  isLoading = false;
  errorMsg = '';
  chart: Chart | null = null;

  constructor(private fb: FormBuilder, private svc: ReportService) {
    this.form = this.fb.group({ dateFrom: ['', Validators.required], dateTo: ['', Validators.required] });
  }

  ngOnInit() {}

  /*drawChart(data: BudgetVsExecution[]) {
    if (this.chart) this.chart.destroy();
    const labels = data.map(d => d.category);
    const budgeted = data.map(d => d.budgeted);
    const executed = data.map(d => d.executed);
    const ctx = (document.getElementById('barChart') as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Presupuestado', data: budgeted },
          { label: 'Ejecutado', data: executed }
        ]
      }
    });
  }*/

  /*generate() {
    if (this.form.invalid) return;
    this.isLoading = true;
    const { dateFrom, dateTo } = this.form.value;
    this.svc.getBudgetVsExecution(dateFrom, dateTo).subscribe({
      next: res => { this.drawChart(res); this.isLoading = false; },
      error: err => { this.errorMsg = 'Error al cargar datos'; this.isLoading = false; }
    });
  }*/
}
