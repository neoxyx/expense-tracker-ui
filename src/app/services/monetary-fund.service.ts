import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface MonetaryFund {
  id?: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class MonetaryFundService {
  private apiUrl = environment.apiUrl + '/monetaryfunds';

  constructor(private http: HttpClient) { }

  getAll(): Observable<MonetaryFund[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => res.data)
    );
  }

  getById(id: number): Observable<MonetaryFund> {
    return this.http.get<MonetaryFund>(`${this.apiUrl}/${id}`);
  }

  create(fund: MonetaryFund): Observable<any> {
    return this.http.post(this.apiUrl, fund);
  }

  update(id: number, fund: MonetaryFund): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, fund);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
