import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { columnDefinition, PeriodicElement } from './employee.config';
import { EmployeeService } from '../shared/services/employee.service';
import { Subscription, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  columnDefination = columnDefinition;
  displayColumns = Array<any>();
  dataSource = new MatTableDataSource([]);
  subscription: Subscription;
  searchTerm$ = new Subject<string>();
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<any>();
    this.searchTerm$.asObservable()
      .pipe(debounceTime(400))
      .subscribe(search => {
        this.filter(search);
      });

    this.columnDefination.forEach(el => {
      this.displayColumns.push(el.id);
    });
    // this.displayColumns.push('action');

    this.subscription = this.employeeService.get().subscribe(result => {
      if (result) {
        this.dataSource.data = result;
      }
    });

    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // if we calling api then for real search
  applyFilter(value) {
    this.searchTerm$.next(value);
  }

  filter(key) {
    this.dataSource.filter = key;
  }

  filterSpecificColumn(event: MatCheckboxChange) {
    console.log(event);
    if (event.checked) {
      this.dataSource.filterPredicate =
        (data: any, filter: string) => !filter || data.name.includes(filter) || data.city.includes(filter);
    } else {
      this.dataSource.filterPredicate =
        (data: any, filter: string) => data;
    }
  }

  edit(row) {
    console.log(row);
    this.router.navigate(['/edit', row.id], {
          state: {
            data: row
          }
        });
  }

  add() {
    // tslint:disable-next-line: no-unused-expression
    this.router.navigate(['/add']);
  }

}
