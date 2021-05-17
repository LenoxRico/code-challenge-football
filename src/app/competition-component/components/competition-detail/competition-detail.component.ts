import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from '@src/app/shared/services';
import { Competition } from '../../interfaces';
import { CompetitionService } from '../../services';
import { CompetitionModalTeamComponent } from '../competition-modal-team';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.scss'],
})
export class CompetitionDetailComponent implements OnInit {
  competition: Competition;
  displayedColumns: string[] = ['currentMatchday', 'startDate', 'endDate'];
  dataSource: any;
  id;

  constructor(
    private route: ActivatedRoute,
    private _coreServices: CoreService,
    private dialog: MatDialog,
    private _competitionService: CompetitionService
  ) {
    route.params.subscribe((data) => (this.id = data.id));
  }

  ngOnInit(): void {
    if (this.id) {
      this.getCompetitionDetail();
    }
  }

  getCompetitionDetail() {
    this._coreServices.displaySpinner(true);
    this._competitionService
      .getCompetitionDetail(this.id)
      .subscribe((response: any) => {
        this.competition = response;
        this.dataSource = new MatTableDataSource(response.seasons);
        this._coreServices.displaySpinner(false);
      });
  }

  openDialog(competition: Competition): void {
    const dialogRef = this.dialog.open(CompetitionModalTeamComponent, {
      width: '700px',
      data: {
        competition,
      },
    });
    dialogRef.afterClosed().subscribe((_) => {});
  }
}
