import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface BudgetVsExecution {
  date: string;
  fundName: string;
  movementType: string;
  commerceName: string;
  details: any[];
  amount: number;
}

@Injectable({ providedIn: 'root' })
export class ReportService {
  private apiUrl = environment.apiUrl + '/reports/budget-vs-execution';
  constructor(private http: HttpClient) { }

  getBudgetVsExecution(dateFrom: string, dateTo: string): Observable<BudgetVsExecution[]> {
    return this.http.get<BudgetVsExecution[]>(`${this.apiUrl}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }
}
