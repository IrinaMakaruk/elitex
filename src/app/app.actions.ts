import { Action } from '@ngrx/store';
import Transaction from './api/interface';
import { Table } from './app.state';

export default interface AppAction<T> extends Action {
    payload: T;
}

export const GET_TABLE_DATA = '[Action] GetTableData';
export const ADD_NEW_ROW = '[Action] AddNewRow';

export class GetTableData implements Action {
    readonly type = GET_TABLE_DATA;
    payload: Table;

    constructor(payload: Table) { 
        this.payload = payload;
    }
}

export class AddNewRow implements AppAction<Transaction> {
    readonly type = ADD_NEW_ROW;
    payload: Transaction
    
    constructor(payload: Transaction) {
        this.payload = payload;
    }
    
}

export type All = GetTableData | AddNewRow ;