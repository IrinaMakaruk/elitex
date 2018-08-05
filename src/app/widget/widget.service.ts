import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable()
export class WidgetService {
 
  constructor(private http: HttpClient) { }

  getTableData() {
    const apiUrl = '/api/tableData';
    return this.http.get(apiUrl)
    .pipe(
      tap(data => console.error('fetched data', data)),
      catchError(this.handleError('getTableData', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
         console.error(operation , error);
         return of(result as T);
    };
  }
}
