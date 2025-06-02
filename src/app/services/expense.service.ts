import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface ExpenseDetailDto {
  ExpenseTypeId: number;
  Amount: number;
}

export interface ExpenseRequest {
  Date: string;             // ISO date
  MonetaryFundId: number;
  Observations: string;
  CommerceName: string;
  DocumentType: string;
  Details: ExpenseDetailDto[];
}

export interface OverrunAlert {
  ExpenseTypeId: number;
  Budgeted: number;
  OverrunBy: number;
}

export interface ExpenseResponse {
  code: number;
  message: string;
  alerts: OverrunAlert[];
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private base = environment.apiUrl + '/expenses';
  constructor(private http: HttpClient) {}

  createExpense(req: ExpenseRequest): Observable<ExpenseResponse> {
    return this.http.post<ExpenseResponse>(this.base, req);
  }
}
