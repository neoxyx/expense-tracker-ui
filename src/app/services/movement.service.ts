import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Movement {
  date: string;
  fund: string;
  type: string;
  commerceName: string | null;
  description: string | null;
  category: string | null;
  amount: number;
  details:any;
}

@Injectable({ providedIn: 'root' })
export class MovementService {
  private base = environment.apiUrl + '/movements';
  constructor(private http: HttpClient) {}

  getMovements(dateFrom: string, dateTo: string): Observable<Movement[]> {
    return this.http.get<Movement[]>(`${this.base}?dateFrom=${dateFrom}&dateTo=${dateTo}`);
  }
}
