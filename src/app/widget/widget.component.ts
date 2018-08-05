  import { Component, OnInit, ViewChild } from '@angular/core';

  import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

  import * as _ from 'lodash';

  import Transaction from '../api/interface';
  import { WidgetService } from './widget.service';

  import { Store, select, Action } from '@ngrx/store';
  import { Observable, Subscription } from 'rxjs';
  import { AddNewRow, ADD_NEW_ROW, GET_TABLE_DATA} from '../app.actions';
  import { AppReducer } from '../app.reducer';
  import AppAction from '../app.actions';
  import { Table } from '../app.state';

  @Component({
  selector: 'widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  providers: [WidgetService],
  })

  export class Widget implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  title: string = 'Expenses';
  edit: boolean = false; 
  panelOpenState: boolean = false;
  displayedColumns: string[] = ['name', 'amount'];
  dataSource: MatTableDataSource<Transaction>;
  tableState$: Observable<Table>;
  subscription: Subscription;

  constructor(private store: Store<Table>) {}

  ngOnInit() {
    this.getTableData();
  }

  expandPanel(matExpansionPanel, event: Event): void {
    event.stopPropagation();
    
    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.toggle();
    }
  }

  private _isExpansionIndicator(target): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }

  editTitle(event) {
    event.stopPropagation();
    this.edit = !this.edit;
  }

  saveEditedTitle(title) {
    this.title = title;
    this.edit = !this.edit;
  }

  handleSpacebar(event) {
    if (event.keyCode === 32) {
      event.stopPropagation();
    }
  }

  getTotalCost() {
    return _.map(this.dataSource, t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  addItem(data) {
    let createTableAction: AppAction<Transaction> = {
      type: ADD_NEW_ROW,
      payload: { name: data.name, amount: data.amount }
    }
    this.updateDataSource();
    this.store.dispatch(createTableAction);
  }

  private getTableData() {
    this.tableState$ = this.store.pipe(select('tableData'));

    let getToDoAction: Action = {
      type: GET_TABLE_DATA      
    }
    this.subscription = this.tableState$.subscribe(table => {
      console.log(table,'data')
      this.dataSource = new MatTableDataSource(table._data);
      this.updateDataSource();
    });

    this.store.dispatch(getToDoAction);
  }

  private updateDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}