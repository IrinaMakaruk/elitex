import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect,ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators'

import { GET_TABLE_DATA } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions
  ) { }

  @Effect() getTableData$ = this.actions$.pipe(
    ofType(GET_TABLE_DATA),
    switchMap(payload => this.http.get('/api/tableData'),
    map((res: Response)=> ({ type: 'LOGIN_SUCCESS', payload: res.json() }))),
    catchError(() => of({ type: 'LOGIN_FAILED' })
  )

      );
}
