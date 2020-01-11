
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEmployee } from '../models/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = environment.apiUrl + '/api';
  private searchUrl = this.baseUrl + '/emps';
  private addUrl = this.baseUrl + '/add';
  private deleteUrl = this.baseUrl + '/delete';
  private updateUrl = this.baseUrl + '/update';

  constructor(private http: HttpClient) { }

  get(): Observable<IEmployee[]> {
    return this.http
      .get<any>(this.searchUrl)
      .pipe(
        map(res => res.data),
        tap(response => {
          return response;
        }),

      );
  }

  add(payload): Observable<any> {
    // --20190704 console.log("the payload: ", payload);
    return this.http
      .post<any>(this.addUrl, payload)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  edit(payload): Observable<any> {
    return this.http
      .put<any>(this.updateUrl, payload)
      .pipe(
        tap(response => {
          return response;
        }),

      );
  }

  delete(payload): Observable<any> {
    return this.http.request('delete', this.deleteUrl, { body: payload }).pipe(
      tap(response => {
        return response;
      }),

    );
  }
}
