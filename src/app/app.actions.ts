import { Action } from '@ngrx/store';
import Transaction from './api/interface';

export default interface AppAction<T> extends Action {
  payload: T;
}

export const GET_TABLE_DATA = '[Action] GetTableData';
export const ADD_NEW_ROW = '[Action] AddNewRow';
export const GET_DATA_SUCCESS = '[Action] GetDataSuccess';
export const GET_DATA_FAILED = '[Action] GetDataFaild';

export class GetTableData implements Action {
  readonly type = GET_TABLE_DATA;
  payload: Transaction;

  constructor(payload: Transaction) {
    this.payload = payload;
  }
}

export class AddNewRow implements AppAction<Transaction> {
  readonly type = ADD_NEW_ROW;
  payload: Transaction;

  constructor(payload: Transaction) {
      this.payload = payload;
  }

}
export class GetDataSuccess implements AppAction<Transaction> {
  readonly type = GET_DATA_SUCCESS;
  payload: Transaction;

  constructor(payload: Transaction) {
    this.payload = payload;
  }
}

export class GetDataFaild implements AppAction<Transaction> {
  readonly type = GET_DATA_FAILED;
  constructor(public payload: any) { }
}

export type All = GetTableData | GetDataSuccess | GetDataFaild | AddNewRow;
