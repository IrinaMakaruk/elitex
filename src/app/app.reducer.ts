
import AppAction from './app.actions';
import Transaction from './api/interface';
import { initializeState } from './app.state';
import * as AppActions from './app.actions';
import { Action } from "@ngrx/store";

const initialState = initializeState();

export function AppReducer(state = initialState,
    action: Action) {

    switch (action.type) {
        case AppActions.GET_TABLE_DATA:            
            return { ...state, name: '', amount: 0 };

        case AppActions.ADD_NEW_ROW:
            return ({
                _data: state._data.concat((action as AppAction<Transaction[]>).payload),
            });

        default:
            return state;
    }
}