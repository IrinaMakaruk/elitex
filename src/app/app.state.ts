import Transactions from './api/interface';

export interface Table {
  _data: Transactions[];
}

export const initializeState = (): Table => {
  return ({
    _data : null
  })
}
