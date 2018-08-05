import { InMemoryDbService } from 'angular-in-memory-web-api';

export class Api implements InMemoryDbService{

  createDb(): {} {
    let tableData = {
      _data : [
        {name: 'Coffee', amount: 30},
        {name: 'Milk', amount: 4.30},
        {name: 'New dress', amount: 4},
        {name: 'Lemon', amount: 77.06}
        ]}
    return {tableData};
  }
}
