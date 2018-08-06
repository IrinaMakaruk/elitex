import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Actions, Effect ,ofType } from '@ngrx/effects';
import { map, catchError } from 'rxjs/operators'

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { WidgetService } from './widget/widget.service';

import * as actions from './app.actions';
import Transactions from './api/interface';

@Injectable()
export class AppEffects {
    @Effect()
    get$: Observable<any> = this.actions$.pipe(
      ofType<actions.GetTableData>(actions.GET_TABLE_DATA),
      switchMap(() =>
          this.widgetService
              .getTableData().pipe(
                map((res: Transactions[]) => ({ type: actions.GET_DATA_SUCCESS, payload: res }) ,
                catchError(() => of({ type: actions.GET_DATA_FAILED })
              )
            )
          )
        )
      );      
    constructor(
        private widgetService: WidgetService,
        private actions$: Actions
    ) {}
}

