import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface MonetaryFundResponse {
  code: number;
  message: string;
  data: any;
}

@Injectable({ providedIn: 'root' })
export class MonetaryFundService {
  private base = environment.apiUrl + '/monetaryfunds';

  constructor(private http: HttpClient) { }

  getFunds(): Observable<MonetaryFundResponse> {
    return this.http.get<MonetaryFundResponse>(this.base);
  }
}
