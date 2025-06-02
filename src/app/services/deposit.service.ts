import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface DepositRequest {
  Date: string;             // ISO date
  MonetaryFundId: number;
  Amount: number;
}

export interface DepositResponse {
  code: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class DepositService {
  private base = environment.apiUrl + '/deposits';
  constructor(private http: HttpClient) {}

  createDeposit(req: DepositRequest): Observable<DepositResponse> {
    return this.http.post<DepositResponse>(this.base, req);
  }
}
