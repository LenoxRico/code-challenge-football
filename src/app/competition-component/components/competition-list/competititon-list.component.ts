import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '@src/app/shared/services';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { CompetitionService } from '../../services';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    dateA11yLabel: 'LL',
  },
};

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CompetitionListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'countryCode', 'plan'];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  src = 'assets/icon.png';
  date = new FormControl(moment());
  isFiltered = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _competitionService: CompetitionService,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getCompetitions();
  }

  getCompetitions(
    filter = '',
    limit = this.pageSize,
    offset = this.currentPage
  ) {
    this._coreServices.displaySpinner(true);
    this.isFiltered = filter ? filter : '';
    this._competitionService
      .getCompetitions(filter, limit, offset)
      .subscribe((response: any) => {
        const data = response.competitions;
        data.length = response.count;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this._coreServices.displaySpinner(false);
      });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    // this.getCompetitions('', end, start);
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.getCompetitions(this.date.value.format('YYYY'));
  }
}
