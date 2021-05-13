import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '@src/app/shared/services';
import { Competition } from '../../interfaces';
import { CompetitionService } from '../../services';

@Component({
  selector: 'app-competition-modal-team',
  templateUrl: './competition-modal-team.component.html',
  styleUrls: ['./competition-modal-team.component.scss'],
})
export class CompetitionModalTeamComponent implements OnInit {
  competition: Competition;
  teams: Competition;
  displayedColumns: string[] = ['name', 'clubColors', 'phone', 'website'];
  dataSource: any;

  constructor(
    public dialogRef: MatDialogRef<CompetitionModalTeamComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _coreServices: CoreService,
    private _competitionService: CompetitionService
  ) {
    this.competition = this.data.competition;
  }

  ngOnInit(): void {
    if (this.competition.id) {
      this.getCompetitionTeam(this.competition.id);
    } else {
      this.cancel();
    }
  }

  getCompetitionTeam(id: number) {
    this._coreServices.displaySpinner(true);
    this._competitionService
      .getCompetitionTeam(id)
      .subscribe((response: any) => {
        this.teams = response;
        this.dataSource = new MatTableDataSource(response.teams);
        this._coreServices.displaySpinner(false);
      });
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
