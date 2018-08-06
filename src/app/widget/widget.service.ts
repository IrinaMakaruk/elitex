import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable()
export class WidgetService {
 
  constructor(private http: HttpClient) { }

  getTableData() {
    const apiUrl = 'http://localhost:4200/assets/data.json';
    return this.http.get(apiUrl)
    .pipe(
      catchError(this.handleError('getTableData', []))
    );
  }

  postRowIntoTable(body) {
    const apiUrl = 'http://localhost:4200/assets/data.json';
    return this.http.post(apiUrl, body)
    .pipe(
      catchError(this.handleError('postRowIntoTable', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
         console.error(operation , error);
         return of(result as T);
    };
  }
}
