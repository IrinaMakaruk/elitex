
import AppAction from './app.actions';
import { initializeState } from './app.state';
import * as AppActions from './app.actions';
import { Action } from '@ngrx/store';

const initialState = initializeState();

export function AppReducer(state = initialState,
  action: Action) {

    switch (action.type) {
      case AppActions.GET_TABLE_DATA:
        return { ...state};

      case AppActions.ADD_NEW_ROW:
        return ({
          _data: state._data.concat((action as AppAction<any>).payload),
        });
      case AppActions.GET_DATA_SUCCESS: {
        return {
          ...state,
          _data: (action as AppAction<any>).payload
        };
      }

      case AppActions.GET_DATA_FAILED: {
        return {
          ...state,
          _data: []
        };
      }

      default:
          return state;
  }
}
