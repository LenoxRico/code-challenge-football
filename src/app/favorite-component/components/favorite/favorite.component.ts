import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CompetitionModalComponent } from '@src/app/competition-component/components/competition-modal';
import { Competition } from '@src/app/competition-component/interfaces';
import { CoreService, NotificationService } from '@src/app/shared/services';

import { Favorite } from '../../interfaces';
import { FavoriteService } from '../../services';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
})
export class FavoriteComponent implements OnInit {
  favoriteInformation: Favorite;
  displayedColumns: string[] = ['name', 'favorite'];
  dataSource: any;
  public pageSize = 5;
  public currentPage = 0;
  src = 'assets/pokeball.png';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private _favoriteService: FavoriteService,
    private _router: Router,
    private _translate: TranslateService,
    private _notificationService: NotificationService,
    private _coreServices: CoreService
  ) {}

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
    this._coreServices.displaySpinner(true);
    this._favoriteService.getFavorites().subscribe((response: any) => {
      const data = response.split(',');
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this._coreServices.displaySpinner(false);
      this.validateFavorites(data);
    });
  }

  removeFavorite(competition) {
    const favorite = window.sessionStorage.getItem('favorite-competitions');
    if (favorite) {
      const removeCompetition = favorite.replace(competition, '');
      window.sessionStorage.setItem('favorite-competitions', removeCompetition);
      const data = removeCompetition.split(',');
      this.dataSource = new MatTableDataSource(data);
      this.validateFavorites(data);
    }
  }

  validateFavorites(data) {
    if (!data.length || data[0] === '') {
      this._translate
        .get(`favorite-component.favorite-list.empty`)
        .subscribe((text) => {
          this._notificationService.showNotification(text, false);
          this._router.navigate(['/competition-list']);
        });
    }
  }

  openDialog(competition: Competition): void {
    const data = {
      name: competition,
      url: `https://pokeapi.co/api/v2/competition/${competition}`,
    };
    const dialogRef = this.dialog.open(CompetitionModalComponent, {
      width: '700px',
      data: {
        competition: data,
      },
    });
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
