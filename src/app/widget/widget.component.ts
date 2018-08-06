  import { Component, OnInit, ViewChild } from '@angular/core';

  import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

  import * as _ from 'lodash';

  import Transactions from '../api/interface';
  import { WidgetService } from './widget.service';

  import { Store, select, Action } from '@ngrx/store';
  import { Observable, Subscription } from 'rxjs';
  
  import { ADD_NEW_ROW, GET_TABLE_DATA} from '../app.actions';
  import AppAction from '../app.actions';

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
  totalCost: number;
  panelOpenState: boolean = false;
  displayedColumns: string[] = ['name', 'amount'];
  dataSource: MatTableDataSource<Transactions>;
  tableState$: Observable<any>;
  subscription: Subscription;

  constructor(private store: Store<Transactions>) {}

  ngOnInit() {
    this.getTableData();
  }

  expandPanel(matExpansionPanel, event: Event): void {
    event.stopPropagation();
    
    if (!this._isExpansionIndicator(event.target)) {
      matExpansionPanel.toggle();
    }
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
    this.totalCost = _.map(this.dataSource.data, t => t.amount).reduce((acc, value) => acc + value, 0);
  }

  addItem(data) {
    let createTableAction: AppAction<any> = {
      type: ADD_NEW_ROW,
      payload: { name: data.name, amount: Number(data.amount)}
    }
    this.updateDataSource();
    this.store.dispatch(createTableAction);
  }

  private _isExpansionIndicator(target): boolean {
    const expansionIndicatorClass = 'mat-expansion-indicator';
    return (target.classList && target.classList.contains(expansionIndicatorClass));
  }

  private getTableData() {
    this.tableState$ = this.store.pipe(select('tableData'));
    let getAction: Action = {
      type: GET_TABLE_DATA      
    }
    this.subscription = this.tableState$.subscribe((table) => {
      this.dataSource = new MatTableDataSource(table._data);
      this.updateDataSource();
    });

    this.store.dispatch(getAction);
  }

  private updateDataSource() {
    const sum = obj => _.sum(_.map(obj.data, t => t.amount));
    const setValue = val => this.dataSource[val] = this['val']
    setValue('paginator');
    this.dataSource.sort = this.sort;
    this.totalCost = sum(this.dataSource);
  }
}