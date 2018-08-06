import Transactions from './api/interface';

export const initializeState = (): Transactions => {
  return ({
    _data : [{name: 'No Data', amount: 0}]
  });
}
