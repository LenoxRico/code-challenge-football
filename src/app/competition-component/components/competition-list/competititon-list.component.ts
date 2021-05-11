import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '@src/app/shared/services';
import { Cookie } from 'ng2-cookies';
import { Observable } from 'rxjs';

import { Competition } from '../../interfaces';
import { CompetitionService } from '../../services';
import { CompetitionModalComponent } from '../competition-modal';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss'],
})
export class CompetitionListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'favorite'];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  src = 'assets/icon.png';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _competitionService: CompetitionService,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getCompetitions();
  }

  getCompetitions(filter = '', limit = this.pageSize, offset = this.currentPage) {
    this._coreServices.displaySpinner(true);
    this._competitionService
      .getCompetitions(filter, limit, offset)
      .subscribe((response: any) => {
        const data = response.results;
        data.length = response.count;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this._coreServices.displaySpinner(false);
      });
  }

  validateFavStatus(competition) {
    const favorite = window.sessionStorage.getItem('favorite-competitions');
    return favorite && favorite.includes(competition)
      ? 'favorite'
      : 'remove_circle';
  }

  addFavorite(competition) {
    const favorite = window.sessionStorage.getItem('favorite-competitions');
    if (favorite) {
      if (favorite.includes(competition)) {
        const removeCompetition = favorite.replace(competition, '');
        window.sessionStorage.setItem('favorite-competitions', removeCompetition);
      } else {
        window.sessionStorage.setItem(
          'favorite-competitions',
          `${favorite},${competition}`
        );
      }
    } else {
      window.sessionStorage.setItem('favorite-competitions', competition);
    }
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }

  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.getCompetitions('', end, start);
  }

  openDialog(competition: Competition): void {
    const dialogRef = this.dialog.open(CompetitionModalComponent, {
      width: '700px',
      data: {
        competition,
      },
    });
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
