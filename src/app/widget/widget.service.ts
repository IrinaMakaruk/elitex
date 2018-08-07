import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class WidgetService {
  private apiUrl = 'http://localhost:4200/assets/api/data.json';

  constructor(private http: HttpClient) { }

  getTableData() {
    return this.http.get(this.apiUrl)
    .pipe(
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
